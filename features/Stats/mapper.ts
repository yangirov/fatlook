import { capitalizeFirstLetter, formatDate, getPercents, parseDate } from '@/shared/utils';
import { FoodInfo, ReportData } from '@/shared/types';
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

    const chartData = report.data.reduce<{ date: string; chart: FoodDtoWithCount[] }[]>((acc, item) => {
        const d = parseDate(item.date);
        const info = {
            date: `${capitalizeFirstLetter(formatDate(d, 'EEEEEE'))} ${formatDate(d, 'd')}`,
            chart: item.meals.reduce<FoodDtoWithCount[]>((acc, meal) => {
                const kcal = Number(meal.total.kcal);
                acc.push({ name: meal.name, count: +getPercents(kcal, dailyAmount, false), kcal });
                return acc;
            }, [])
        };

        acc.push(info);
        return acc;
    }, []);

    const totalChartData = chartData.reduce<{ [key: string]: { name: string; kcal: number } }>((acc, meal) => {
        meal.chart.forEach(({ name, kcal }) => {
            if (!acc[name]) {
                acc[name] = { name, kcal };
            } else {
                acc[name].kcal += kcal;
            }
        });

        return acc;
    }, {});

    const allChartData = Object.values(totalChartData).map<FoodDtoWithPercents>(item => ({ ...item, percents: getPercents(item.kcal, allEatenFood.kcal).toString() }));

    return {
        allEatenFood,
        eatenFood,
        chartData,
        allChartData,
        dailyAmount
    };
};
