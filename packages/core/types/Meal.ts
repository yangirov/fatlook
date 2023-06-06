import { Dictionary } from '../utils';

import { FoodDetails, FoodInfo } from './Food';

export type Meal = {
    name: string;
    total: FoodDetails;
    foods: FoodInfo[];
};

export const MEAL_ICONS: Dictionary = {
    Завтрак: '🌅',
    Обед: '🕑',
    Ужин: '🌇',
    Перекус: '🍏',
};
