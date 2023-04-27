import { FoodDetails, FoodInfo } from './Food';

export type Meal = {
    name: string;
    total: FoodDetails;
    foods: FoodInfo[];
};
