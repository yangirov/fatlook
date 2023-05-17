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
import { FoodAverage } from './components/FoodAverage';
import { FoodCalories } from './components/FoodCalories';
import { FoodNutrients } from './components/FoodNutrients';
import { NutrientsSummary } from './components/NutrientsSummary';
import styles from './Stats.module.scss';

export type StatsProps = {
    report?: ReportData;
};

export const StatsContext = createContext<{ data: StatsData }>({
    data: {} as StatsData,
});

const StatsHeader: FC = () => {
    const router = useRouter();

    return (
        <div className={styles.statsHeader}>
            <div className={styles.statsHeaderBack}>
                <MdArrowBack onClick={() => router.back()} />
            </div>
            <div>Отчет за неделю</div>
            <div></div>
        </div>
    );
};

export const Stats: FC<StatsProps> = ({ report }) => {
    const params = useParams();
    const userId = params?.userId.toString() ?? '';
    const user = useAppSelector(state => getUserById(state, userId));

    const data = mapStats(report, user?.dailyAmount);

    if (!data) {
        return (
            <PageLayout>
                <PageLayout.Header>
                    <StatsHeader />
                </PageLayout.Header>

                <PageLayout.Content>
                    <EmptyContent />
                </PageLayout.Content>
            </PageLayout>
        );
    }

    return (
        <StatsContext.Provider value={{ data }}>
            <PageLayout>
                <PageLayout.Header>
                    <StatsHeader />
                </PageLayout.Header>
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
                            <NutrientsSummary />
                        </Tab>
                    </Tabs>
                </PageLayout.Content>
            </PageLayout>
        </StatsContext.Provider>
    );
};
