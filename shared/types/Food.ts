import { ObjectWithOptionalKeys } from '../utils/types';

export type FoodUnit = string | number | null;

export type FoodInfo = {
    name: string;
    weight: string;
    details: FoodDetails;
};

export type FoodDetails = {
    kcal: FoodUnit;
    allFat: FoodUnit;
    fat: FoodUnit;
    nonSaturatedFat: FoodUnit;
    carbohydrates: FoodUnit;
    fiber: FoodUnit;
    sugar: FoodUnit;
    protein: FoodUnit;
    sodium: FoodUnit;
    cholesterol: FoodUnit;
    kalium: FoodUnit;
};

export type PartialFoodDetailsKeys = Partial<keyof FoodDetails>[];

export type UnitInfo = {
    fullName: string;
    shortName: string;
    parseName: string;
    unitName: string;
};

export type UnitMap = ObjectWithOptionalKeys<FoodDetails, UnitInfo>;

const getUnitInfo = (params: string[]): UnitInfo => ({
    fullName: params[0],
    shortName: params[1].length === 0 ? params[0] : params[1],
    parseName: params[2],
    unitName: params[3]
});

export const unitMap: UnitMap = {
    kcal: getUnitInfo(['Калории', '', 'Кал ( ккал)', 'г']),
    allFat: getUnitInfo(['Всего жиров', 'Жиры', '', 'г']),
    fat: getUnitInfo(['Жир', '', 'Жир( г)', 'г']),
    nonSaturatedFat: getUnitInfo(['Н/жир', '', 'Н/жир( г)', 'г']),
    carbohydrates: getUnitInfo(['Углеводы', 'Углев', 'Углев( г)', 'г']),
    fiber: getUnitInfo(['Клетчатка', 'Клетч', 'Клетч( г)', 'г']),
    sugar: getUnitInfo(['Сахар', '', 'Сахар( г)', 'г']),
    protein: getUnitInfo(['Белок', 'Белк', 'Белк( г)', 'г']),
    sodium: getUnitInfo(['Натрий', 'Натр', 'Натри( мг)', 'мг']),
    cholesterol: getUnitInfo(['Холестерин', 'Холес', 'Холес( мг)', 'мг']),
    kalium: getUnitInfo(['Калий', '', 'Калий( мг)', 'н'])
};

export const mealIconMap: { [key: string]: string } = {
    Завтрак: '🌅',
    Обед: '🕑',
    Ужин: '🌇',
    Перекус: '🍏'
};
