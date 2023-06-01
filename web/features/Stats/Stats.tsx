'use client';
import { FC, createContext, useState } from 'react';

import { useRouter } from 'next/navigation';

import { StatsData } from '@/core/types';
import { formatDate, isEmpty } from '@/core/utils';
import { useRouteParams } from '@/web/shared/hooks';
import { useCurrentUser } from '@/web/shared/hooks/useCurrentUser';
import { PageLayout } from '@/web/shared/layouts';
import { EmptyContent, Tab, Tabs, WeekSelector } from '@/web/shared/ui';

import { FoodAverage } from './entities/FoodAverage';
import { FoodCalories } from './entities/FoodCalories';
import { FoodNutrients } from './entities/FoodNutrients';
import { FoodNutrientsSummary } from './entities/FoodNutrientsSummary';

import styles from './Stats.module.scss';

export const StatsContext = createContext<{ stats: StatsData }>({
    stats: {} as StatsData,
});

type StatsProps = {
    stats: StatsData;
};

export const Stats: FC<StatsProps> = ({ stats }) => {
    const router = useRouter();

    const routeParams = useRouteParams();
    const user = useCurrentUser();

    const [date] = useState<Date>();

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
                {date && <WeekSelector date={date} onChange={onWeekChange} />}

                {!stats || isEmpty(stats) ? (
                    <EmptyContent />
                ) : (
                    <StatsContext.Provider value={{ stats }}>
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
                    </StatsContext.Provider>
                )}
            </PageLayout.Content>
        </PageLayout>
    );
};
