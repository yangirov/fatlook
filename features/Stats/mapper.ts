import { capitalizeFirstLetter, formatDate, getPercents, parseDate } from '@/shared/utils';
import { FoodInfo, ReportData } from '@/shared/types';
import { ChartData } from '@/shared/ui';

import { EatenFood, FoodDtoWithCount, FoodDtoWithPercents, StatsData } from './types';

export const mapStats = (report?: ReportData, dailyAmount?: number): StatsData => {
    if (!report || !dailyAmount) {
        return {} as StatsData;
    }

    const foodData = report.data.reduce<FoodInfo[]>((acc, item) => {
        acc.push(...item.meals.flatMap(meal => meal.foods));
        return acc;
    }, []);

    const allEatenFood: FoodDtoWithCount = { name: 'Всего', count: 0, kcal: 0 };

    const foods = foodData.reduce<EatenFood>((acc, { name, details: { kcal } }) => {
        if (!acc[name]) {
            acc[name] = { name, count: 1, kcal: Number(kcal) };
        } else {
            acc[name].count += 1;
            acc[name].kcal += Number(kcal);
        }

        allEatenFood.count += 1;
        allEatenFood.kcal += Number(kcal);

        return acc;
    }, {});

    const eatenFood: FoodDtoWithCount[] = Object.keys(foods)
        .sort((a, b) => foods[b].kcal - foods[a].kcal)
        .map(x => foods[x]);

    eatenFood.push(allEatenFood);

    const chartData = report.data.reduce<ChartData[]>((acc, item) => {
        const d = parseDate(item.date);
        const info = {
            label: `${capitalizeFirstLetter(formatDate(d, 'EEEEEE'))} ${formatDate(d, 'd')}`,
            values: item.meals.reduce<number[]>((acc, meal) => {
                acc.push(Number(meal.total.kcal));
                return acc;
            }, [])
        };

        acc.push(info);
        return acc;
    }, []);

    const mealData = report.data.reduce<{ [key: string]: { name: string; kcal: number } }>((acc, meal) => {
        meal.meals.forEach(({ name, total: { kcal } }) => {
            if (!kcal) {
                kcal = 0;
            }

            if (!acc[name]) {
                acc[name] = { name, kcal: +kcal };
            } else {
                acc[name].kcal += +kcal;
            }
        });

        return acc;
    }, {});

    const allMealData = Object.values(mealData).map<FoodDtoWithPercents>(item => ({ ...item, percents: getPercents(item.kcal, allEatenFood.kcal).toString() }));

    return {
        allEatenFood,
        eatenFood,
        chartData,
        allMealData,
        dailyAmount
    };
};
