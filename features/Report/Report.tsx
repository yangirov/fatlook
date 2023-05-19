'use client';
import { FC, createContext } from 'react';

import { useRouter } from 'next/navigation';

import { PageLayout } from '@/shared/layouts';
import { ReportData } from '@/shared/types';
import { EmptyContent } from '@/shared/ui';
import { isEmpty } from '@/shared/utils';

import ReportHeader from './entities/ReportHeader';
import ReportMeals from './entities/ReportMeals';
import ReportNavigation from './entities/ReportNavigation';
import ReportSummary from './entities/ReportSummary';
import ReportTotal from './entities/ReportTotal';

type ReportProps = {
    report: ReportData;
};

export const ReportContext = createContext<{ report: ReportData }>({
    report: {} as ReportData,
});

export const Report: FC<ReportProps> = ({ report }) => {
    const router = useRouter();

    return (
        <ReportContext.Provider value={{ report }}>
            <PageLayout onBack={() => router.push('/')}>
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
