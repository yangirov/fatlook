'use client';
import { FC, createContext } from 'react';
import { PartialFoodDetailsKeys, ReportData } from '@/shared/types';

import { PageLayout } from '@/shared/layouts';
import { isEmpty } from '@/shared/utils';

import ReportHeader from './components/ReportHeader';
import ReportSummary from './components/ReportSummary';
import ReportMeals from './components/ReportMeals';
import ReportTotal from './components/ReportTotal';

import styles from './Report.module.scss';

type ReportProps = {
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
            <PageLayout>
                <PageLayout.Header>
                    <ReportHeader />
                </PageLayout.Header>

                <PageLayout.Content>
                    <div className={styles.empty}>Ничего не найдено 🙄</div>
                </PageLayout.Content>
            </PageLayout>
        );
    }
    return (
        <ReportContext.Provider value={{ report, visibleItems }}>
            <PageLayout>
                <PageLayout.Header>
                    <ReportHeader />
                </PageLayout.Header>

                <PageLayout.Content>
                    <ReportTotal />
                    <ReportMeals />
                    <ReportSummary />
                </PageLayout.Content>
            </PageLayout>
        </ReportContext.Provider>
    );
};
