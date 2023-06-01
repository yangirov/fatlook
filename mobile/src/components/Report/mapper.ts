import { HKQuantitySample, HKQuantityTypeIdentifier } from '@kingstinct/react-native-healthkit';
import queryQuantitySamples from '@kingstinct/react-native-healthkit/src/utils/queryQuantitySamples';

import { endOfDay, startOfDay } from 'date-fns';

import { FoodDetails, ReportData } from '@/core/types';
import { formatDate } from '@/core/utils';
import { FOOD_PERMISSIONS, UNIT_MAP } from '@/mobile/shared/consts';

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

const mapData = <T extends HKQuantityTypeIdentifier>(result: ReportData, data: readonly HKQuantitySample<T>[]) => {
    const info = result.data[0];

    data.forEach(food => {
        if (food.metadata) {
            const mealName = food.metadata?.['Еда'];
            let meal = info.meals.find(x => x.name === mealName);
            if (!meal) {
                const index = info.meals.push({
                    name: mealName?.toString() || '',
                    total: { ...initialFoodDetails },
                    foods: [],
                });

                meal = info.meals[index - 1];
            }

            const unitKey = UNIT_MAP[food.quantityType]?.key;

            if (unitKey) meal.total[unitKey] = (Number(meal.total[unitKey] || 0) + Number(food.quantity)).toFixed(2);

            const foodName = food.metadata.HKFoodType?.toString();
            if (foodName) {
                let currentFood = meal.foods.find(f => f.name === foodName);
                if (!currentFood) {
                    const index = meal.foods.push({
                        name: foodName,
                        weight: 'null',
                        details: { ...initialFoodDetails },
                    });

                    currentFood = meal.foods[index - 1];
                }

                if (unitKey) currentFood.details[unitKey] = food.quantity.toFixed(2);
            }
        }
    });
};

export const getReportFromHK = (userId: string, date: Date) => {
    const result: ReportData = {
        userId,
        date: formatDate(date),
        total: { ...initialFoodDetails },
        data: [
            {
                date: formatDate(date),
                meals: [],
            },
        ],
    };

    return Promise.all(
        FOOD_PERMISSIONS.map(async id => {
            const res = await queryQuantitySamples(id, {
                from: startOfDay(date),
                to: endOfDay(date),
                unit: UNIT_MAP[id]?.unitKey,
            });

            mapData(result, res.samples);
            return {};
        })
    ).then(() => {
        result.total = result.data[0].meals.reduce<FoodDetails>((acc, meal) => {
            Object.entries(meal.total).forEach(([k, v]) => {
                acc[k] = (Number(acc[k] || 0) + Number(v)).toFixed(2);
            });

            return acc;
        }, {} as FoodDetails);

        return result;
    });
};
