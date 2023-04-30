import { FoodDetails } from './Food';
import { Meal } from './Meal';

export type ReportData = {
    date: string;
    total: FoodDetails;
    meals: Meal[];
    weight?: string;
    steps?: string;
};
