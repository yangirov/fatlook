import { NextApiRequest } from 'next';

import {
    EatenFood,
    FoodDetails,
    FoodDtoWithCount,
    FoodDtoWithPercents,
    FoodInfo,
    StatsData,
} from '@fatlook/core/types';
import {
    Dictionary,
    Entries,
    capitalizeFirstLetter,
    formatDate,
    getPercents,
    isEmpty,
    parseDate,
} from '@fatlook/core/utils';

import { getReportFromFatSecret } from './getReportFromFatSecret';

const initialStats: StatsData = {
    date: formatDate(new Date()),
    eatenFood: [],
    chartData: [],
    allMeals: [],
    healthData: [],
};

export const getStatsData = async (req: NextApiRequest): Promise<StatsData> => {
    const { query } = req;
    if (!query || isEmpty(query)) {
        return initialStats;
    }

    const report = await getReportFromFatSecret(req);

    const foodData = report.data.reduce<FoodInfo[]>((acc, item) => {
        acc.push(...item.meals.flatMap(meal => meal.foods));
        return acc;
    }, []);

    const allEatenFood: FoodDtoWithCount = { name: 'Всего', count: 0, kcal: 0, fat: 0, protein: 0, carbohydrates: 0 };

    const mapItem = (acc: EatenFood, name: string, payload: FoodDetails): EatenFood => {
        if (!acc[name]) {
            acc[name] = { name, count: 1, kcal: 0, fat: 0, protein: 0, carbohydrates: 0 };
        } else {
            acc[name].count = Number(acc[name].count) + 1;
        }

        ['kcal', 'fat', 'protein', 'carbohydrates'].forEach(field => {
            acc[name][field] = Math.floor(Number(acc[name][field] ?? 0) + Number(payload[field]));
            allEatenFood[field] = Math.floor(Number(allEatenFood[field] ?? 0) + Number(payload[field]));
        });

        allEatenFood.count = Number(allEatenFood.count) + 1;
        return acc;
    };

    const foods = foodData.reduce<EatenFood>((acc, { name, details }) => mapItem(acc, name, details), {});

    const eatenFood: FoodDtoWithCount[] = Object.keys(foods)
        .sort((a, b) => foods[b].kcal - foods[a].kcal)
        .map(x => foods[x]);

    eatenFood.push(allEatenFood);

    const chartData = report.data.reduce<
        {
            label: string;
            values: number[];
        }[]
    >((acc, item) => {
        const d = parseDate(item.date);
        const info = {
            label: `${capitalizeFirstLetter(formatDate(d, 'EEEEEE'))} ${formatDate(d, 'd')}`,
            values: item.meals.reduce<number[]>((acc, meal) => {
                acc.push(Number(meal.total.kcal));
                return acc;
            }, []),
        };

        acc.push(info);
        return acc;
    }, []);

    const mealData = report.data.reduce<Dictionary<{ name: string; kcal: number }>>((acc, meal) => {
        meal.meals.forEach(({ name, total: { kcal } }) => {
            if (!kcal) kcal = 0;

            if (!acc[name]) {
                acc[name] = { name, kcal: +kcal };
            } else {
                acc[name].kcal += +kcal;
            }
        });

        return acc;
    }, {});

    const allMeals = Object.values(mealData).map<FoodDtoWithPercents>(item => ({
        ...item,
        percents: getPercents(item.kcal, allEatenFood.kcal).toString(),
    }));

    const totalData = { count: report.data.length, data: report.total };

    const foodDetails = report.data.reduce<Dictionary<FoodDetails>>((acc, item) => {
        item.meals.forEach(meal => {
            if (!acc[item.date]) {
                acc[item.date] = { ...meal.total };
            } else {
                const items = Object.entries(meal.total) as Entries<FoodDetails>;
                items.forEach(([key, value]) => {
                    if (value) {
                        acc[item.date][key] = Math.floor(Number(acc[item.date][key] || 0) + Number(value));
                    }
                });
            }
        });

        return acc;
    }, {});

    return {
        date: report.date,
        allEatenFood,
        eatenFood,
        chartData,
        allMeals,
        totalData,
        foodDetails,
        healthData: [],
    };
};
