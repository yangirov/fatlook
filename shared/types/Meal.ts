import { FoodDetails, FoodInfo } from './Food';

export type Meal = {
    name: string;
    total: FoodDetails;
    foods: FoodInfo[];
};

export const mealIconMap: { [key: string]: string } = {
    Завтрак: '🌅',
    Обед: '🕑',
    Ужин: '🌇',
    Перекус: '🍏'
};

const getUnitInfo = (color: string, key: string) => ({ color, key });

export const mealColors: { [key: string]: { color: string; key: string } } = {
    Завтрак: getUnitInfo('#ffb700', 'breakfast'),
    Обед: getUnitInfo('#01b4f8', 'lunch'),
    Ужин: getUnitInfo('#fd9570', 'dinner'),
    Перекус: getUnitInfo('#935ac1', 'snack')
};
