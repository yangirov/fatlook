import { FC } from 'react';

import { PartialFoodDetailsKeys, Meal } from '@/shared/types';
import ReportMeal from '../ReportMeal';

export type ReportMealsProps = {
    visibleItems: PartialFoodDetailsKeys;
    meals: Meal[];
};

const ReportMeals: FC<ReportMealsProps> = ({ visibleItems, meals }) => (
    <>
        {meals.map(meal => (
            <ReportMeal key={meal.name} meal={meal} visibleItems={visibleItems} />
        ))}
    </>
);

export default ReportMeals;
