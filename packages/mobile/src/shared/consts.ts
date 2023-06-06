import {
    HKQuantityTypeIdentifier,
    HKStatisticsOptions,
    HKUnits,
    UnitForIdentifier,
    UnitOfEnergy,
} from '@kingstinct/react-native-healthkit';

import { Dictionary } from '@fatlook/core/utils';

export const ACTIVITY_PERMISSIONS = [
    {
        id: HKQuantityTypeIdentifier.bodyMass,
        option: HKStatisticsOptions.discreteAverage,
    },
    {
        id: HKQuantityTypeIdentifier.stepCount,
        option: HKStatisticsOptions.cumulativeSum,
    },
];

export const FOOD_PERMISSIONS = [
    HKQuantityTypeIdentifier.dietaryEnergyConsumed,
    HKQuantityTypeIdentifier.dietaryProtein,
    HKQuantityTypeIdentifier.dietaryCarbohydrates,
    HKQuantityTypeIdentifier.dietaryFiber,
    HKQuantityTypeIdentifier.dietaryFatTotal,
    HKQuantityTypeIdentifier.dietaryFatSaturated,
    HKQuantityTypeIdentifier.dietaryCholesterol,
    HKQuantityTypeIdentifier.dietarySodium,
    HKQuantityTypeIdentifier.dietarySugar,
    HKQuantityTypeIdentifier.dietaryPotassium,
];

export const READ_PERMISSIONS = [
    HKQuantityTypeIdentifier.stepCount,
    HKQuantityTypeIdentifier.bodyMass,
    ...FOOD_PERMISSIONS,
];

type UnitInfo<T extends HKQuantityTypeIdentifier> = {
    key: string;
    name: string;
    unitKey: UnitForIdentifier<T>;
    unitName: string;
};

const getUnitInfo = <T extends HKQuantityTypeIdentifier>(
    name: string,
    key: string,
    unitKey: UnitForIdentifier<T>,
    unitName: string
): UnitInfo<T> => ({ key, name, unitKey, unitName });

export const UNIT_MAP: Partial<{ [key in HKQuantityTypeIdentifier]: UnitInfo<key> }> = {
    [HKQuantityTypeIdentifier.stepCount]: getUnitInfo('Шаги', 'steps', HKUnits.Count, 'шагов'),
    [HKQuantityTypeIdentifier.bodyMass]: getUnitInfo('Кг', 'weight', 'kg', 'кг'),
    [HKQuantityTypeIdentifier.dietaryEnergyConsumed]: getUnitInfo('Калории', 'kcal', UnitOfEnergy.Kilocalories, 'ккал'),
    [HKQuantityTypeIdentifier.dietaryProtein]: getUnitInfo('Белок', 'protein', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietaryCarbohydrates]: getUnitInfo('Углеводы', 'carbohydrates', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietaryFiber]: getUnitInfo('Клетчатка', 'fiber', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietaryFatTotal]: getUnitInfo('Жиры', 'allFat', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietaryFatSaturated]: getUnitInfo('Н/жиры', 'fat', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietaryCholesterol]: getUnitInfo('Холестерин', 'cholesterol', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietarySodium]: getUnitInfo('Натрий', 'sodium', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietarySugar]: getUnitInfo('Сахар', 'sugar', 'g', 'г'),
    [HKQuantityTypeIdentifier.dietaryPotassium]: getUnitInfo('Кальций', 'kalium', 'g', 'г'),
};

export type Goal = { isRange: boolean; from: number | null; to: number };

const getGoal = (payload: number | [number, number]): Goal => {
    if (Array.isArray(payload)) {
        const [from, to] = payload;
        return { isRange: true, from, to };
    }

    return { isRange: false, from: null, to: payload };
};

export const ID_MAP: Partial<{ [key in HKQuantityTypeIdentifier]: string }> = {
    [HKQuantityTypeIdentifier.stepCount]: 'steps',
    [HKQuantityTypeIdentifier.dietaryEnergyConsumed]: 'kcal',
    [HKQuantityTypeIdentifier.dietaryProtein]: 'protein',
    [HKQuantityTypeIdentifier.dietaryCarbohydrates]: 'carbohydrates',
    [HKQuantityTypeIdentifier.dietaryFiber]: 'fiber',
    [HKQuantityTypeIdentifier.dietaryFatTotal]: 'fatTotal',
};

export const DEFAULT_GOALS_MAP: Partial<{ [key in HKQuantityTypeIdentifier]: Goal }> = {
    [HKQuantityTypeIdentifier.stepCount]: getGoal([10_000, 12_000]),
    [HKQuantityTypeIdentifier.dietaryEnergyConsumed]: getGoal(2_500),
    [HKQuantityTypeIdentifier.dietaryProtein]: getGoal([120, 150]),
    [HKQuantityTypeIdentifier.dietaryCarbohydrates]: getGoal(80),
    [HKQuantityTypeIdentifier.dietaryFiber]: getGoal(24),
    [HKQuantityTypeIdentifier.dietaryFatTotal]: getGoal([80, 100]),
};

export const GOALS_MAP: Dictionary<Goal> = {
    steps: getGoal([10_000, 12_000]),
    kcal: getGoal(2_500),
    protein: getGoal([120, 150]),
    carbohydrates: getGoal(80),
    fiber: getGoal(25),
    fatTotal: getGoal([80, 100]),
};

export const FAT_SECRET_USER_ID = 'FAT_SECRET_USER_ID';
export const FAT_SECRET_USER_REPORT_URL = 'FAT_SECRET_USER_REPORT_URL';
