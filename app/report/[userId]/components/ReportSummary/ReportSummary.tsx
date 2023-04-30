import { FC } from 'react';

import { FoodDetails, FoodUnit, PartialFoodDetailsKeys, unitMap } from '@/shared/types';

import styles from './ReportSummary.module.scss';

export type ReportSummaryProps = {
    total: FoodDetails;
};

const FormatUnit: FC<{ unitKey: string; unitValue: FoodUnit }> = ({ unitKey, unitValue }) => (
    <div>
        {unitMap[unitKey].fullName}: {unitValue}
    </div>
);

const ReportSummary: FC<ReportSummaryProps> = ({ total }) => {
    const { fat, nonSaturatedFat } = total;
    const keys: PartialFoodDetailsKeys = ['cholesterol', 'sodium', 'carbohydrates', 'fiber', 'sugar', 'protein'];

    return (
        <div className={styles.reportSummary}>
            <div>Всего жиров: {(+(fat ?? 0) + +(nonSaturatedFat ?? 0)).toFixed(2)} </div>
            {keys.map(key => (
                <FormatUnit key={key} unitKey={key} unitValue={total[key]} />
            ))}
        </div>
    );
};

export default ReportSummary;
