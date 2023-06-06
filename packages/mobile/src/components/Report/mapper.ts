import {
    HKQuantitySample,
    HKQuantityTypeIdentifier as TId,
    QueryStatisticsResponseRaw,
    UnitForIdentifier,
} from '@kingstinct/react-native-healthkit';
import queryQuantitySamples, {
    QueryQuantitySamplesResponse,
} from '@kingstinct/react-native-healthkit/src/utils/queryQuantitySamples';
import queryStatisticsForQuantity from '@kingstinct/react-native-healthkit/src/utils/queryStatisticsForQuantity';

import { ReportData } from '@fatlook/core/types';
import { formatDate, endOfDay, startOfDay } from '@fatlook/core/utils';

import { ACTIVITY_PERMISSIONS, FOOD_PERMISSIONS, UNIT_MAP } from '@/mobile/shared/consts';

const initialFoodDetails = {
    kcal: null,
    allFat: null,
    fat: null,
    saturatedFat: null,
    carbohydrates: null,
    fiber: null,
    sugar: null,
    protein: null,
    sodium: null,
    cholesterol: null,
    kalium: null,
};

type MapPayload = Partial<{ [key in TId]: readonly HKQuantitySample<TId>[] }>;

const mapData = (
    date: Date,
    activities: {
        id: TId;
        payload: QueryStatisticsResponseRaw<TId, UnitForIdentifier<TId>>;
    }[],
    foods: {
        id: TId;
        payload: QueryQuantitySamplesResponse<TId>;
    }[]
) => {
    const report: ReportData = {
        date: formatDate(date),
        total: { ...initialFoodDetails },
        data: [
            {
                date: formatDate(date),
                meals: ['Завтрак', 'Обед', 'Ужин', 'Перекус/Другое'].map(name => ({
                    name,
                    total: { ...initialFoodDetails },
                    foods: [],
                })),
            },
        ],
    };

    activities.forEach(({ id, payload }) => {
        const unitKey = UNIT_MAP[id]?.key;

        if (unitKey === 'weight') {
            report[unitKey] = Number(payload?.averageQuantity?.quantity);
        }

        if (unitKey === 'steps') {
            report[unitKey] = Math.floor(Number(payload?.sumQuantity?.quantity));
        }
    });

    const data = foods.reduce<MapPayload>((acc, item) => {
        acc[item.id] = item.payload.samples;
        return acc;
    }, {});

    const result = report.data[0];

    const item = data[TId.dietaryEnergyConsumed];
    if (!item) return report;

    item.forEach((food, index) => {
        const mealName = food.metadata && Object.values(food.metadata)[0];
        const meal = result.meals.find(x => x.name === mealName);

        FOOD_PERMISSIONS.forEach(unit => {
            const foodKey = UNIT_MAP[unit]?.key;

            if (meal && foodKey) {
                const sample = data[unit];
                const currentItem = sample && sample[index];

                if (currentItem) {
                    const quantity = currentItem.quantity || 0;

                    const mealUnitValue = Number(meal.total[foodKey] || 0) + quantity;
                    meal.total[foodKey] = Number(mealUnitValue.toFixed(2));

                    const totalUnitValue = Number(report.total[foodKey] || 0) + mealUnitValue;
                    report.total[foodKey] = Number(totalUnitValue.toFixed(2));

                    const foodName = food.metadata?.HKFoodType?.toString();
                    if (foodName) {
                        let foodIndex = meal.foods.findIndex(f => f.name === foodName);

                        if (foodIndex === -1) {
                            foodIndex =
                                meal.foods.push({
                                    name: foodName,
                                    weight: '',
                                    details: { ...initialFoodDetails },
                                }) - 1;
                        }

                        const details = meal.foods[foodIndex].details;
                        if (details) {
                            details[foodKey] = Number(details[foodKey] || 0) + quantity;
                        }
                    }
                }
            }
        });
    });

    return report;
};

export const getReportFromHK = (userId: string, date: Date) => {
    const from = startOfDay(date);
    const to = endOfDay(date);

    const activity = Promise.all(
        ACTIVITY_PERMISSIONS.map(async ({ id, option }) => ({
            id,
            payload: (await queryStatisticsForQuantity(
                id,
                [option],
                from,
                to,
                UNIT_MAP[id]?.unitKey
            )) as QueryStatisticsResponseRaw<TId, UnitForIdentifier<TId>>,
        }))
    );

    const food = Promise.all(
        FOOD_PERMISSIONS.map(async id => ({
            id,
            payload: await queryQuantitySamples(id, {
                from,
                to,
                unit: UNIT_MAP[id]?.unitKey,
            }),
        }))
    );

    return Promise.all([activity, food]).then(([activities, foods]) => mapData(date, activities, foods));
};
