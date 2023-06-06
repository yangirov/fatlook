'use client';
import { FC, createContext } from 'react';

import { useRouter } from 'next/navigation';

import { ReportData } from '@fatlook/core/types';
import { isEmpty } from '@fatlook/core/utils';

import { PageLayout } from '@/web/shared/layouts';
import { EmptyContent } from '@/web/shared/ui';

import ReportHeader from './entities/ReportHeader';
import ReportHealth from './entities/ReportHealth';
import ReportMeals from './entities/ReportMeals';
import ReportNavigation from './entities/ReportNavigation';
import ReportSummary from './entities/ReportSummary';
import ReportTotal from './entities/ReportTotal';

import styles from './Report.module.scss';

export const ReportContext = createContext<{ report: ReportData }>({
    report: {} as ReportData,
});

type ReportProps = {
    report: ReportData;
};

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
                            <ReportHealth />
                            <ReportSummary />
                            <ReportNavigation />
                        </>
                    )}
                </PageLayout.Content>
            </PageLayout>
        </ReportContext.Provider>
    );
};
