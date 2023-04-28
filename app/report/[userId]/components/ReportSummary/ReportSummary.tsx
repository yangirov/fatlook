import { FC } from 'react';

import { FoodDetails } from '@/shared/types';

import styles from './ReportSummary.module.scss';

export type ReportSummaryProps = {
    total: FoodDetails;
};

const ReportSummary: FC<ReportSummaryProps> = ({ total }) => {
    const { fat, nonSaturatedFat, cholesterol, sodium, carbohydrates, fiber, sugar, protein } = total;

    return (
        <div className={styles.reportSummary}>
            <div>Всего жиров: {(+(fat ?? 0) + +(nonSaturatedFat ?? 0)).toFixed(2)} г</div>
            <div>Холестерин: {cholesterol} мг</div>
            <div>Натрий: {sodium} мг</div>
            <div>Углеводов: {carbohydrates} г</div>
            <div>Клетчатка: {fiber} г</div>
            <div>Сахар: {sugar} г</div>
            <div>Белок: {protein} г</div>
        </div>
    );
};

export default ReportSummary;
