import { FC } from 'react';

import { FoodDetails, Meal } from '@/shared/types';
import ReportMeal from '../ReportMeal';

export type ReportMealsProps = {
    visibleItems: Array<Partial<keyof FoodDetails>>;
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
