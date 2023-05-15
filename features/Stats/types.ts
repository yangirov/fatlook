type FoodDto<T extends 'count' | 'percents'> = {
    name: string;
    kcal: number;
} & (T extends 'count' ? { count: number } : T extends 'percents' ? { percents: string } : never);

export type FoodDtoWithPercents = FoodDto<'percents'>;
export type FoodDtoWithCount = FoodDto<'count'>;
export type EatenFood = { [key: string]: FoodDtoWithCount };

export type StatsData = {
    allEatenFood: FoodDtoWithCount;
    eatenFood: FoodDtoWithCount[];
    chartData: {
        date: string;
        chart: FoodDtoWithCount[];
    }[];
    allChartData: FoodDtoWithPercents[];
    dailyAmount: number;
};
