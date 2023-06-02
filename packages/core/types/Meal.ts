import { FoodDetails, FoodInfo } from './Food';

export type Meal = {
    name: string;
    total: FoodDetails;
    foods: FoodInfo[];
};

export const MEAL_ICONS: { [key: string]: string } = {
    Завтрак: '🌅',
    Обед: '🕑',
    Ужин: '🌇',
    Перекус: '🍏',
};
