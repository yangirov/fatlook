import { FoodDetails } from './Food';

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
    date: string;
    allEatenFood: FoodDtoWithCount;
    eatenFood: FoodDtoWithCount[];
    chartData: {
        label: string;
        values: number[];
    }[];
    allMeals: FoodDtoWithPercents[];
    totalData: { count: number; data: FoodDetails };
    foodDetails: { [key: string]: FoodDetails };
};
