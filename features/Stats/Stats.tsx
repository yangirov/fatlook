'use client';
import { FC, createContext } from 'react';

import { PageLayout } from '@/shared/layouts';
import { ReportData } from '@/shared/types';

import { useAppSelector } from '@/shared/store';
import { useParams } from 'next/navigation';
import { getUserById } from '@/shared/store/usersReducer';
import { EmptyContent, Tab, Tabs } from '@/shared/ui';

import { mapStats } from './mapper';
import { StatsData } from './types';

import { FoodCard } from './components/FoodCard';
import { FoodAmount } from './components/FoodAmount';
import { FoodAverage } from './components/FoodAverage';

import styles from './Stats.module.scss';

export type StatsProps = {
    report?: ReportData;
};

export const StatsContext = createContext<{ data: StatsData }>({
    data: {} as StatsData
});

export const Stats: FC<StatsProps> = ({ report }) => {
    const params = useParams();
    const userId = params?.userId.toString() ?? '';
    const user = useAppSelector(state => getUserById(state, userId));

    const data = mapStats(report, user?.dailyAmount);

    if (!data) {
        return <EmptyContent />;
    }

    return (
        <StatsContext.Provider value={{ data }}>
            <PageLayout>
                <PageLayout.Header>Отчет за неделю</PageLayout.Header>
                <PageLayout.Content>
                    <Tabs navClassName={styles.statsTabs} contentClassName={styles.statsTabsContent}>
                        <Tab title="Средние планки">
                            <FoodAverage />
                        </Tab>
                        <Tab title="Калории">
                            <FoodAmount />
                            <FoodCard />
                        </Tab>
                    </Tabs>
                </PageLayout.Content>
            </PageLayout>
        </StatsContext.Provider>
    );
};
