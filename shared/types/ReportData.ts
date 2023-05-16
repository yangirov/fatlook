import { ObjectWithOptionalKeys } from '../utils';
import { FoodDetails } from './Food';
import { Meal } from './Meal';

export type ReportData = {
    userId: string;
    date: string;
    total: FoodDetails;
    data: { date: string; meals: Meal[] }[];
    weight?: string;
    steps?: string;
};

export const REPORT_CALC_RATIO: ObjectWithOptionalKeys<FoodDetails, number> = {
    allFat: 9.3,
    protein: 4.1,
    carbohydrates: 4.1
};
