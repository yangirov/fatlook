'use client';
import { FC, createContext } from 'react';
import { PartialFoodDetailsKeys, ReportData } from '@/shared/types';

import { isEmpty } from '@/shared/utils';

import ReportHeader from './components/ReportHeader';
import ReportSummary from './components/ReportSummary';
import ReportMeals from './components/ReportMealsList';
import ReportTotal from './components/ReportTotal';

import styles from './Report.module.scss';

export type ReportProps = {
    report?: ReportData;
};

const visibleItems: PartialFoodDetailsKeys = ['protein', 'fat', 'fiber', 'carbohydrates'];

export const ReportContext = createContext<{ report: ReportData; visibleItems: PartialFoodDetailsKeys }>({
    report: {} as ReportData,
    visibleItems
});

export const Report: FC<ReportProps> = ({ report }) => {
    if (!report || isEmpty(report.meals)) {
        return (
            <div className={styles.container}>
                <ReportHeader />

                <div className={styles.reportBody}>
                    <div className={styles.empty}>Ничего не найдено 🙄</div>
                </div>
            </div>
        );
    }

    return (
        <ReportContext.Provider value={{ report, visibleItems }}>
            <div className={styles.container}>
                <ReportHeader />

                <div className={styles.reportBody}>
                    <ReportTotal />
                    <ReportMeals />
                    <ReportSummary />

                    {report.weight && report.steps && (
                        <div className={styles.total}>
                            <div>Вес: {report.weight} кг</div>
                            <div>Шаги: {report.steps} шагов</div>
                        </div>
                    )}
                </div>
            </div>
        </ReportContext.Provider>
    );
};
