'use client';
import { FC } from 'react';
import { FoodDetails, ReportData } from '@/shared/types';

import ReportHeader from './components/ReportHeader';
import ReportSummary from './components/ReportSummary';
import ReportMeals from './components/ReportMealsList';
import ReportTotal from './components/ReportTotal';

import styles from './Report.module.scss';

const tableList: Array<Partial<keyof FoodDetails>> = ['protein', 'fat', 'fiber', 'carbohydrates'];

export type ReportProps = {
    report?: ReportData;
};

export const Report: FC<ReportProps> = ({ report }) => {
    if (!report) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>Ничего не найдено</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ReportHeader date={report.date} />

            <div className={styles.report}>
                <ReportTotal visibleItems={[...tableList, 'kcal']} total={report.total} />
                <ReportMeals visibleItems={tableList} meals={report.meals} />
                <ReportSummary total={report.total} />

                {report.weight && report.steps && (
                    <div className={styles.total}>
                        <div>Вес: {report.weight} кг</div>
                        <div>Шаги: {report.steps} шагов</div>
                    </div>
                )}
            </div>
        </div>
    );
};
