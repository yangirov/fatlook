import { FoodDetails } from './Food';
import { Meal } from './Meal';

export type NutritionData = {
    date: string;
    total: FoodDetails;
    meals: Meal[];
};
