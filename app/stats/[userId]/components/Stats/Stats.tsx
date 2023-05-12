'use client';
import { FC } from 'react';

import { PageLayout } from '@/shared/layouts';
import { ReportData } from '@/shared/types';

import styles from './Stats.module.scss';

export type StatsProps = {
    report?: ReportData;
};

export const Stats: FC<StatsProps> = ({ report }) => {
    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>
            <PageLayout.Content>
                <pre>{JSON.stringify(report, undefined, 2)}</pre>
            </PageLayout.Content>
        </PageLayout>
    );
};
