'use client';
import { FC, createContext } from 'react';

import { ReportData } from '@/shared/types';
import { PageLayout } from '@/shared/layouts';
import { isEmpty } from '@/shared/utils';
import { EmptyContent } from '@/shared/ui';

import ReportHeader from './components/ReportHeader';
import ReportSummary from './components/ReportSummary';
import ReportMeals from './components/ReportMeals';
import ReportTotal from './components/ReportTotal';
import ReportNavigation from './components/ReportNavigation';

type ReportProps = {
    report: ReportData;
};

export const ReportContext = createContext<{ report: ReportData }>({
    report: {} as ReportData,
});

export const Report: FC<ReportProps> = ({ report }) => {
    return (
        <ReportContext.Provider value={{ report }}>
            <PageLayout>
                <PageLayout.Header>
                    <ReportHeader />
                </PageLayout.Header>

                <PageLayout.Content>
                    {!report || isEmpty(report?.data) ? (
                        <EmptyContent />
                    ) : (
                        <>
                            <ReportTotal />
                            <ReportMeals />
                            <ReportSummary />
                            <ReportNavigation />
                        </>
                    )}
                </PageLayout.Content>
            </PageLayout>
        </ReportContext.Provider>
    );
};
