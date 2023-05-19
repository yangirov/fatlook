'use client';
import { FC, createContext } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useParams, useRouter } from 'next/navigation';

import { PageLayout } from '@/shared/layouts';
import { ReportData } from '@/shared/types';
import { useAppSelector } from '@/shared/store';
import { getUserById } from '@/shared/store/usersReducer';
import { EmptyContent, Tab, Tabs } from '@/shared/ui';

import { mapStats } from './mapper';
import { StatsData } from './types';
import { FoodAverage } from './entities/FoodAverage';
import { FoodCalories } from './entities/FoodCalories';
import { FoodNutrients } from './entities/FoodNutrients';
import { FoodNutrientsSummary } from './entities/FoodNutrientsSummary';

import styles from './Stats.module.scss';

export type StatsProps = {
    report?: ReportData;
};

export const StatsContext = createContext<{ data: StatsData }>({
    data: {} as StatsData,
});

export const Stats: FC<StatsProps> = ({ report }) => {
    const params = useParams();
    const userId = params?.userId.toString() ?? '';
    const user = useAppSelector(state => getUserById(state, userId));

    const data = mapStats(report, user?.dailyAmount);

    if (!data) {
        return (
            <PageLayout>
                <PageLayout.Header>Отчеты</PageLayout.Header>
                <PageLayout.Content>
                    <EmptyContent />
                </PageLayout.Content>
            </PageLayout>
        );
    }

    return (
        <StatsContext.Provider value={{ data }}>
            <PageLayout>
                <PageLayout.Header>Отчеты</PageLayout.Header>
                <PageLayout.Content>
                    <Tabs>
                        <Tab title="Планки">
                            <FoodAverage />
                        </Tab>
                        <Tab title="Калории">
                            <FoodCalories />
                        </Tab>
                        <Tab title="Макроэлементы">
                            <FoodNutrients />
                        </Tab>
                        <Tab title="Питательные вещества">
                            <FoodNutrientsSummary />
                        </Tab>
                    </Tabs>
                </PageLayout.Content>
            </PageLayout>
        </StatsContext.Provider>
    );
};
