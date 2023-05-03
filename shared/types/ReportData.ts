import { ObjectWithOptionalKeys } from '../utils/types';
import { FoodDetails } from './Food';
import { Meal } from './Meal';

export type ReportData = {
    userId: string;
    date: string;
    total: FoodDetails;
    meals: Meal[];
    weight?: string;
    steps?: string;
};

export const REPORT_CALC_RATIO: ObjectWithOptionalKeys<FoodDetails, number> = {
    allFat: 9.3,
    protein: 4.1,
    carbohydrates: 4.1
};

export const REPORT_SUMMARY_COLORS: ObjectWithOptionalKeys<FoodDetails, string> = {
    allFat: '#fb8681',
    protein: '#f8c44a',
    carbohydrates: '#75c3da'
};
