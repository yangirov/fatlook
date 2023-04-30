import { FC, useContext } from 'react';

import { FoodInfo } from '@/shared/types';

import { ReportContext } from '../../Report';

import styles from './ReportFood.module.scss';

export type ReportFoodProps = {
    food: FoodInfo;
};

const ReportFood: FC<ReportFoodProps> = ({ food: { name, weight, details } }) => {
    const { visibleItems } = useContext(ReportContext);

    return (
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
};

export default ReportFood;
