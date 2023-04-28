import { FC } from 'react';

import { FoodDetails, Meal, mealIconMap } from '@/shared/types';

import ReportFood from '../ReportFood';

import styles from './ReportMeal.module.scss';

export type ReportMealProps = {
    visibleItems: Array<Partial<keyof FoodDetails>>;
    meal: Meal;
};

const ReportMeal: FC<ReportMealProps> = ({ visibleItems, meal }) => (
    <div className={styles.reportMeal}>
        <div className={styles.reportMealHeader}>
            <div className={styles.reportMealHeaderIcon}>{mealIconMap[meal.name]}</div>
            <div className={styles.reportMealHeaderInfo}>
                <div className={styles.reportMealHeaderTitle}>
                    <div>{meal.name}</div>
                    <div>
                        <div className={styles.reportMealHeaderTitleKcal}>{meal.total.kcal}</div>
                        <div className={styles.reportMealHeaderTitleKcalText}>Ккал</div>
                    </div>
                </div>
                <div className={styles.reportMealHeaderTotal}>
                    {visibleItems.map(k => (
                        <div key={k}>{meal.total[k]}</div>
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.reportMealInfo}>
            {meal.foods.length !== 0 ? (
                meal.foods.map(food => <ReportFood key={food.name} food={food} visibleItems={visibleItems} />)
            ) : (
                <div className={styles.foodItemEmpty}>Пусто</div>
            )}
        </div>
    </div>
);

export default ReportMeal;
