import { FoodDetails } from '@/shared/types';
import { ChartData } from '@/shared/ui';

export type FoodDtoWithPercents = {
    name: string;
    kcal: number;
    percents: string;
};

export type FoodDtoWithCount = {
    name: string;
    count: string | number;
    kcal: number;
    fat: number;
    protein: number;
    carbohydrates: number;
    [key: string]: string | number;
};

export type EatenFood = { [key: string]: FoodDtoWithCount };

export type StatsData = {
    allEatenFood: FoodDtoWithCount;
    eatenFood: FoodDtoWithCount[];
    chartData: ChartData[];
    allMeals: FoodDtoWithPercents[];
    dailyAmount: number;
    totalData: { count: number; data: FoodDetails };
    foodDetails: { [key: string]: FoodDetails };
};
