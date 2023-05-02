import { Meal, ReportData, FoodDetails, FoodInfo, FoodUnit } from '@/shared/types';

export const parseCSV = (str: string) => {
    const arr: string[][] = [];

    let quote = false;
    let col;
    let c;

    for (let row = (col = c = 0); c < str.length; c++) {
        const cc = str[c];
        const nc = str[c + 1];

        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || '';

        if (cc == '"' && quote && nc == '"') {
            arr[row][col] += cc;
            ++c;
            continue;
        }

        if (cc == '"') {
            quote = !quote;
            continue;
        }

        if (cc == ',' && !quote) {
            ++col;
            continue;
        }

        if (cc == '\n' && !quote) {
            ++row;
            col = 0;
            continue;
        }

        arr[row][col] += cc;
    }

    return arr;
};

export const parseFatSecretCSV = (csv: string): ReportData => {
    const matrix = parseCSV(csv);

    const headerIndex = matrix.findIndex(line => line[0].startsWith('Дата'));
    const findFoodUnitIndex = (name: string) => matrix[headerIndex].findIndex(col => col.includes(name));

    const kcalIndex = findFoodUnitIndex('Кал ( ккал)');
    const fatIndex = findFoodUnitIndex('Жир( г)');
    const nonSaturatedFatIndex = findFoodUnitIndex('Н/жир( г)');
    const carbohydratesIndex = findFoodUnitIndex('Углев( г)');
    const fiberIndex = findFoodUnitIndex('Клетч( г)');
    const sugarIndex = findFoodUnitIndex('Сахар( г)');
    const proteinIndex = findFoodUnitIndex('Белк( г)');
    const sodiumIndex = findFoodUnitIndex('Натри( мг)');
    const cholesterolIndex = findFoodUnitIndex('Холес( мг)');
    const kaliumIndex = findFoodUnitIndex('Калий( мг)');

    const getValue = (rowIndex: number, columnIndex: number): FoodUnit => {
        const value = matrix[rowIndex][columnIndex];

        if (!value) {
            return null;
        }

        const maybeNum = parseFloat(value.replace(',', '.'));
        if (value.length === maybeNum.toString().length && !isNaN(maybeNum)) {
            return maybeNum;
        }

        return value.trim();
    };

    const getAllFat = (rowIndex: number, fatIndex: number, nonSaturatedFatIndex: number) => {
        const fat = Number(getValue(rowIndex, fatIndex) ?? 0);
        const nonSaturatedFat = Number(getValue(rowIndex, nonSaturatedFatIndex) ?? 0);

        return parseFloat((fat + nonSaturatedFat).toFixed(2));
    };

    const getFromRow = (rowIndex: number): FoodDetails => ({
        kcal: getValue(rowIndex, kcalIndex),
        allFat: getAllFat(rowIndex, fatIndex, nonSaturatedFatIndex),
        fat: getValue(rowIndex, fatIndex),
        nonSaturatedFat: getValue(rowIndex, nonSaturatedFatIndex),
        carbohydrates: getValue(rowIndex, carbohydratesIndex),
        fiber: getValue(rowIndex, fiberIndex),
        sugar: getValue(rowIndex, sugarIndex),
        protein: getValue(rowIndex, proteinIndex),
        sodium: getValue(rowIndex, sodiumIndex),
        cholesterol: getValue(rowIndex, cholesterolIndex),
        kalium: getValue(rowIndex, kaliumIndex)
    });

    const mealsNames = ['Завтрак', 'Обед', 'Ужин', 'Перекус'];

    let currentMealIndex = 10;
    const meals = mealsNames.reduce<Meal[]>((acc, meal, mealIndex) => {
        const nextMeal = mealIndex !== mealsNames.length - 1 ? matrix.findIndex(l => l[0].trim().startsWith(mealsNames[mealIndex + 1])) : matrix.length - 1;

        for (let rowIndex = currentMealIndex; rowIndex < nextMeal; rowIndex++) {
            const row = matrix[rowIndex];

            if (row[0].trim().startsWith(meal)) {
                currentMealIndex = rowIndex;

                acc.push({
                    name: meal,
                    total: getFromRow(rowIndex),
                    foods: []
                });
            } else if (row.length === 1) {
                continue;
            } else {
                const food: FoodInfo = {
                    name: getValue(rowIndex, 0) as string,
                    weight: getValue(rowIndex + 1, 0) as string,
                    details: getFromRow(rowIndex)
                };
                acc[mealIndex]?.foods.push(food);
            }
        }

        return acc;
    }, []);

    return {
        date: getValue(1, 1) as string,
        total: getFromRow(matrix.length - 1),
        meals
    };
};
