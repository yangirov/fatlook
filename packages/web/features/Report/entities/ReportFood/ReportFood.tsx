import { FC } from 'react';

import { FoodInfo } from '@fatlook/core/types';

import { useAppSelector } from '@/web/shared/store';

import styles from './ReportFood.module.scss';

export type ReportFoodProps = {
    food: FoodInfo;
};

const ReportFood: FC<ReportFoodProps> = ({ food: { name, weight, details } }) => {
    const visibleColumns = useAppSelector(state => state.report.visibleColumns);

    return (
        <div className={styles.reportFood}>
            <div className={styles.reportFoodItem}>
                <div>{name}</div>
                <div className={styles.reportFoodItemWeight}>{weight}</div>
                <div className={styles.reportFoodItemTotal}>
                    {visibleColumns.map(k => (
                        <div key={k}>{details[k] ?? 0}</div>
                    ))}
                </div>
            </div>
            <div className={styles.reportFoodItemKcal}>{details.kcal}</div>
        </div>
    );
};

export default ReportFood;
