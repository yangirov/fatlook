import { FoodDetails } from './types';
import { ObjectWithOptionalKeys } from './utils';

export enum Colors {
    WHITE = 'var(--white)',
    GREEN = 'var(--green)',
    LIGHT = 'var(--light)'
}

export const DEFAULT_CHART_COLORS = ['cornflowerblue', 'olivedrab', 'orange', 'tomato', 'crimson', 'purple', 'turquoise', 'forestgreen', 'navy', 'gray'];

const getUnitInfo = (color: string, key: string) => ({ color, key });

export const MEAL_COLORS: { [key: string]: { color: string; key: string } } = {
    Завтрак: getUnitInfo('#ffb700', 'breakfast'),
    Обед: getUnitInfo('#01b4f8', 'lunch'),
    Ужин: getUnitInfo('#fd9570', 'dinner'),
    Перекус: getUnitInfo('#935ac1', 'snack')
};

export const REPORT_SUMMARY_COLORS: ObjectWithOptionalKeys<FoodDetails, string> = {
    allFat: '#fb8681',
    protein: '#f8c44a',
    carbohydrates: '#75c3da'
};
