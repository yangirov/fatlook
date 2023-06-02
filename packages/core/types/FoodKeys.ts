import { ObjectWithOptionalKeys } from '../utils';

import { FoodDetails } from './Food';

export type FoodKeys = {
    fullName: string;
    shortName: string;
    parseName: string;
    unitName: string;
};

type FoodKeysMap = ObjectWithOptionalKeys<FoodDetails, FoodKeys>;

const getUnitInfo = (fullName: string, shortName: string | null, parseName: string, unitName: string): FoodKeys => ({
    fullName,
    shortName: shortName ?? fullName,
    parseName,
    unitName,
});

export const foodKeysMap: FoodKeysMap = {
    kcal: getUnitInfo('Калории', null, 'Кал ( ккал)', 'ккал'),
    allFat: getUnitInfo('Всего жиров', 'Жиры', '', 'г'),
    fat: getUnitInfo('Жир', null, 'Жир( г)', 'г'),
    saturatedFat: getUnitInfo('Н/жир', null, 'Н/жир( г)', 'г'),
    carbohydrates: getUnitInfo('Углеводы', 'Углев', 'Углев( г)', 'г'),
    fiber: getUnitInfo('Клетчатка', 'Клетч', 'Клетч( г)', 'г'),
    sugar: getUnitInfo('Сахар', null, 'Сахар( г)', 'г'),
    protein: getUnitInfo('Белок', 'Белк', 'Белк( г)', 'г'),
    sodium: getUnitInfo('Натрий', 'Натр', 'Натри( мг)', 'мг'),
    cholesterol: getUnitInfo('Холестерин', 'Холес', 'Холес( мг)', 'мг'),
    kalium: getUnitInfo('Калий', null, 'Калий( мг)', 'н'),
};

export const nutrientsGoals: { [key: string]: string } = {
    carbohydrates: '50%',
    allFat: '30%',
    protein: '20%',
};
