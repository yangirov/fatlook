'use client';
import { FC, createContext } from 'react';

import { useRouter } from 'next/navigation';

import { StatsData } from '@fatlook/core/types';
import { formatDate, isEmpty, parseDate } from '@fatlook/core/utils';

import { useRouteParams, useWebViewStatus } from '@/web/shared/hooks';
import { useCurrentUser } from '@/web/shared/hooks/useCurrentUser';
import { PageLayout } from '@/web/shared/layouts';
import { EmptyContent, Tab, Tabs, WeekSelector } from '@/web/shared/ui';

import { AverageSummary } from './entities/AverageSummary';
import { FoodCalories } from './entities/FoodCalories';
import { FoodNutrients } from './entities/FoodNutrients';
import { FoodNutrientsSummary } from './entities/FoodNutrientsSummary';
import { HealthSummary } from './entities/HealthSummary';

import styles from './Stats.module.scss';

export const StatsContext = createContext<{ stats: StatsData }>({
    stats: {} as StatsData,
});

type StatsProps = {
    stats: StatsData;
};

export const Stats: FC<StatsProps> = ({ stats }) => {
    const isEmptyStats = isEmpty(stats.foodDetails) || isEmpty(stats.chartData) || isEmpty(stats.allMeals);

    const router = useRouter();
    const routeParams = useRouteParams();

    const isWebView = useWebViewStatus();
    const user = useCurrentUser();

    const onWeekChange = (date: Date) => {
        const sp = new URLSearchParams(routeParams?.searchParams);
        const formattedDate = formatDate(date);
        sp.set('date', formattedDate);

        router.push(`/stats/${user?.id}?${sp}`);
    };

    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>
            <PageLayout.Content>
                {!isWebView && <WeekSelector date={parseDate(stats.date)} onChange={onWeekChange} />}

                {isEmptyStats ? (
                    <EmptyContent />
                ) : (
                    <StatsContext.Provider value={{ stats }}>
                        <Tabs>
                            <Tab title="Планки">
                                <AverageSummary />
                            </Tab>
                            <Tab title="Здоровье">
                                <HealthSummary />
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
                    </StatsContext.Provider>
                )}
            </PageLayout.Content>
        </PageLayout>
    );
};
