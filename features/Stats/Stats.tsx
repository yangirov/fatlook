'use client';
import { FC, createContext, useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { PageLayout } from '@/shared/layouts';
import { useAppSelector } from '@/shared/store';
import { getUserById } from '@/shared/store/usersReducer';
import { ReportData } from '@/shared/types';
import { EmptyContent, Tab, Tabs, WeekSelector } from '@/shared/ui';

import { formatDate, parseDate } from '@/shared/utils';

import { FoodAverage } from './entities/FoodAverage';
import { FoodCalories } from './entities/FoodCalories';
import { FoodNutrients } from './entities/FoodNutrients';
import { FoodNutrientsSummary } from './entities/FoodNutrientsSummary';
import { mapStats } from './mapper';
import { StatsData } from './types';

import styles from './Stats.module.scss';

export type StatsProps = {
    report?: ReportData;
};

export const StatsContext = createContext<{ data: StatsData }>({
    data: {} as StatsData,
});

export const Stats: FC<StatsProps> = ({ report }) => {
    const [date, setDate] = useState<Date>();

    const router = useRouter();
    const searchParams = useSearchParams() as unknown as URLSearchParams;

    const params = useParams();
    const userId = params?.userId.toString() ?? '';
    const user = useAppSelector(state => getUserById(state, userId));

    useEffect(() => {
        if (report) {
            const parsedDate = parseDate(report.date);
            setDate(parsedDate);
        }
    }, [report]);

    const onWeekChange = (date: Date) => {
        const sp = new URLSearchParams(searchParams);

        const formattedDate = formatDate(date);
        sp.set('date', formattedDate);

        router.push(`/stats/${params?.userId}?${sp}`);
    };

    const data = mapStats(report, user?.dailyAmount);

    if (!data) {
        return (
            <PageLayout>
                <PageLayout.Header>Отчеты</PageLayout.Header>
                <PageLayout.Content>
                    {date && <WeekSelector date={date} onChange={onWeekChange} />}
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
                    {date && <WeekSelector date={date} onChange={onWeekChange} />}
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
