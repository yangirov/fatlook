import { ObjectWithOptionalKeys } from '../utils';

import { FoodDetails } from './Food';
import { Meal } from './Meal';

export type ReportData = {
    date: string;
    total: FoodDetails;
    data: { date: string; meals: Meal[] }[];
    weight?: number;
    steps?: number;
};

export const REPORT_CALC_RATIO: ObjectWithOptionalKeys<FoodDetails, number> = {
    allFat: 9.3,
    protein: 4.1,
    carbohydrates: 4.1,
};
