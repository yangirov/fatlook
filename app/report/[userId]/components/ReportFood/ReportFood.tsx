import { FC } from 'react';

import { FoodDetails, FoodInfo } from '@/shared/types';

import styles from './ReportFood.module.scss';

export type ReportFoodProps = {
    visibleItems: Array<Partial<keyof FoodDetails>>;
    food: FoodInfo;
};

const ReportFood: FC<ReportFoodProps> = ({ visibleItems, food: { name, weight, details } }) => (
    <div className={styles.reportFood}>
        <div className={styles.reportFoodItem}>
            <div>{name}</div>
            <div className={styles.reportFoodItemWeight}>{weight}</div>
            <div className={styles.reportFoodItemTotal}>
                {visibleItems.map(k => (
                    <div key={k}>{details[k] ?? 0}</div>
                ))}
            </div>
        </div>
        <div className={styles.reportFoodItemKcal}>{details.kcal}</div>
    </div>
);

export default ReportFood;
