'use client';
import { FC, createContext } from 'react';
import { useRouter } from 'next/navigation';

import { ReportData } from '@/shared/types';
import { PageLayout } from '@/shared/layouts';
import { isEmpty } from '@/shared/utils';
import { EmptyContent } from '@/shared/ui';

import ReportHeader from './entities/ReportHeader';
import ReportSummary from './entities/ReportSummary';
import ReportMeals from './entities/ReportMeals';
import ReportTotal from './entities/ReportTotal';
import ReportNavigation from './entities/ReportNavigation';

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
