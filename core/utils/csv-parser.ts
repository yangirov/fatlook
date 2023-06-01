import { Meal, ReportData, FoodDetails, FoodInfo } from '../types';

import { formatDate, parseDate } from './dates';

const parseCSV = (str: string) => {
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

export const parseFatSecretCSV = (csv: string): Omit<ReportData, 'userId'> => {
    const matrix = parseCSV(csv);

    const headerIndex = matrix.findIndex(line => line[0].startsWith('Дата'));
    const findFoodUnitIndex = (name: string) => matrix[headerIndex].findIndex(col => col.includes(name));

    const kcalIndex = findFoodUnitIndex('Кал ( ккал)');
    const fatIndex = findFoodUnitIndex('Жир( г)');
    const saturatedFatIndex = findFoodUnitIndex('Н/жир( г)');
    const carbohydratesIndex = findFoodUnitIndex('Углев( г)');
    const fiberIndex = findFoodUnitIndex('Клетч( г)');
    const sugarIndex = findFoodUnitIndex('Сахар( г)');
    const proteinIndex = findFoodUnitIndex('Белк( г)');
    const sodiumIndex = findFoodUnitIndex('Натри( мг)');
    const cholesterolIndex = findFoodUnitIndex('Холес( мг)');
    const kaliumIndex = findFoodUnitIndex('Калий( мг)');

    const getValue = (rowIndex: number, columnIndex: number) => {
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

    const getAllFat = (rowIndex: number, fatIndex: number, saturatedFatIndex: number) => {
        const fat = Number(getValue(rowIndex, fatIndex) ?? 0);
        const saturatedFat = Number(getValue(rowIndex, saturatedFatIndex) ?? 0);

        return parseFloat((fat + saturatedFat).toFixed(2));
    };

    const getFromRow = (rowIndex: number): FoodDetails => ({
        kcal: getValue(rowIndex, kcalIndex),
        allFat: getAllFat(rowIndex, fatIndex, saturatedFatIndex),
        fat: getValue(rowIndex, fatIndex),
        saturatedFat: getValue(rowIndex, saturatedFatIndex),
        carbohydrates: getValue(rowIndex, carbohydratesIndex),
        fiber: getValue(rowIndex, fiberIndex),
        sugar: getValue(rowIndex, sugarIndex),
        protein: getValue(rowIndex, proteinIndex),
        sodium: getValue(rowIndex, sodiumIndex),
        cholesterol: getValue(rowIndex, cholesterolIndex),
        kalium: getValue(rowIndex, kaliumIndex),
    });

    const mealsNames = ['Завтрак', 'Обед', 'Ужин', 'Перекус'];

    const getNextMeal = (mealIndex: number, start: number, end: number) => {
        if (mealIndex === mealsNames.length - 1) {
            return end;
        }

        for (let rowIndex = start; rowIndex < end; rowIndex++) {
            const value = matrix[rowIndex][0].trim();

            if (value.startsWith(mealsNames[mealIndex + 1])) {
                return rowIndex;
            }
        }

        return matrix.length - 1;
    };

    const getMeals = (startIndex: number, endIndex: number) => {
        let currentMealIndex = startIndex;
        return mealsNames.reduce<Meal[]>((acc, meal, mealIndex) => {
            const nextMeal = getNextMeal(mealIndex, startIndex, endIndex);

            for (let rowIndex = currentMealIndex; rowIndex < nextMeal; rowIndex++) {
                const row = matrix[rowIndex];

                if (row[0].trim().startsWith(meal)) {
                    currentMealIndex = rowIndex;

                    acc.push({
                        name: meal,
                        total: getFromRow(rowIndex),
                        foods: [],
                    });
                } else if (row.length === 1) {
                    continue;
                } else {
                    const food: FoodInfo = {
                        name: getValue(rowIndex, 0) as string,
                        weight: getValue(rowIndex + 1, 0) as string,
                        details: getFromRow(rowIndex),
                    };
                    acc[mealIndex]?.foods.push(food);
                }
            }

            return acc;
        }, []);
    };

    const daysNames = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

    const days = matrix.reduce<{ date: string; startIndex: number }[]>((acc, row, index) => {
        const value = row[0];

        if (daysNames.some(day => value.toLowerCase().startsWith(day))) {
            const date = parseDate(value, 'EEEE, MMMM dd, yyyy');
            acc.push({
                date: formatDate(date),
                startIndex: index + 1,
            });
        }

        return acc;
    }, []);

    const daysRange = days.map((item, i) => {
        const endIndex = i < days.length - 1 ? days[i + 1].startIndex - 2 : matrix.length - 1;
        return { ...item, endIndex };
    });

    const data = daysRange.map(item => {
        return {
            date: item.date,
            meals: getMeals(item.startIndex, item.endIndex),
        };
    });

    return {
        date: getValue(1, 1) as string,
        total: getFromRow(matrix.length - 1),
        data,
    };
};
