import { FoodDetails } from './Food';
import { Meal } from './Meal';

export type ReportData = {
    date: string;
    total: FoodDetails;
    meals: Meal[];
    weight?: string;
    steps?: string;
};

const CALC_COEF = {
    fat: 9.3,
    protein: 4.1,
    carbohydrates: 4.1
};
