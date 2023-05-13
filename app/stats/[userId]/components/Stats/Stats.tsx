'use client';
import { FC } from 'react';
import classNames from 'classnames';

import { PageLayout } from '@/shared/layouts';
import { FoodInfo, ReportData, mealColors } from '@/shared/types';

import { capitalizeFirstLetter, formatDate, getPercents, parseDate } from '@/shared/utils';
import { useAppSelector } from '@/shared/store';
import { useParams } from 'next/navigation';
import { getUserById } from '@/shared/store/usersReducer';
import { EmptyContent } from '@/shared/ui';
import { Divider } from '@/shared/ui';

import styles from './Stats.module.scss';

type EatenFoodUnit = { name: string; count: number; kcal: number };
type EatenFood = { [key: string]: EatenFoodUnit };

export type StatsProps = {
    report?: ReportData;
};

const calculateStats = (report?: ReportData, dailyAmount?: number) => {
    if (!report || !dailyAmount) {
        return null;
    }

    const foodData = report.data.reduce<FoodInfo[]>((acc, item) => {
        acc.push(...item.meals.flatMap(meal => meal.foods));
        return acc;
    }, []);

    const allEatenFood: EatenFoodUnit = { name: 'Всего', count: 0, kcal: 0 };

    const foods = foodData.reduce<EatenFood>((acc, { name, details: { kcal } }) => {
        if (!acc[name]) {
            acc[name] = { name, count: 1, kcal: Number(kcal) };
        } else {
            acc[name].count += 1;
            acc[name].kcal += Number(kcal);
        }

        allEatenFood.count += 1;
        allEatenFood.kcal += Number(kcal);

        return acc;
    }, {});

    const eatenFood: EatenFoodUnit[] = Object.keys(foods)
        .sort((a, b) => foods[b].kcal - foods[a].kcal)
        .map(x => foods[x]);

    eatenFood.push(allEatenFood);

    const chartData = report.data.reduce<{ date: string; chart: EatenFoodUnit[] }[]>((acc, item) => {
        const d = parseDate(item.date);
        const info = {
            date: `${capitalizeFirstLetter(formatDate(d, 'EEEEEE'))} ${formatDate(d, 'd')}`,
            chart: item.meals.reduce<EatenFoodUnit[]>((acc, meal) => {
                const kcal = Number(meal.total.kcal);
                acc.push({ name: meal.name, count: +getPercents(kcal, dailyAmount, false), kcal });
                return acc;
            }, [])
        };

        acc.push(info);
        return acc;
    }, []);

    const totalChartData = chartData.reduce<{ [key: string]: { name: string; kcal: number } }>((acc, meal) => {
        meal.chart.forEach(({ name, kcal }) => {
            if (!acc[name]) {
                acc[name] = { name, kcal };
            } else {
                acc[name].kcal += kcal;
            }
        });

        return acc;
    }, {});

    const allChartData = Object.values(totalChartData).map(item => ({ ...item, count: getPercents(item.kcal, allEatenFood.kcal) }));

    return {
        allEatenFood,
        eatenFood,
        chartData,
        allChartData
    };
};

export const Stats: FC<StatsProps> = ({ report }) => {
    const params = useParams();
    const userId = params?.userId.toString() ?? '';
    const user = useAppSelector(state => getUserById(state, userId));

    const data = calculateStats(report, user?.dailyAmount);

    if (!data) {
        return <EmptyContent />;
    }

    const { allEatenFood, allChartData, eatenFood, chartData } = data;

    return (
        <PageLayout>
            <PageLayout.Header>Отчет за неделю</PageLayout.Header>
            <PageLayout.Content>
                <div className={styles.chartCard}>
                    <div className={styles.chartCardSubTitle}>Калории</div>
                    <div className={styles.chartCardTitle}>{allEatenFood.kcal}</div>

                    <div className={styles.chartCardDaily}>
                        <div>Среднесуточная норма: {Math.floor(allEatenFood.kcal / 6)}</div>
                        <div>Цель: {user?.dailyAmount}</div>
                    </div>

                    <div className={styles.cardContent}>
                        <div className={styles.cardContentItem}>
                            <div className={styles.cardContentItemInfo}>
                                <div></div>
                                <div></div>
                                <div>Калории</div>
                            </div>
                        </div>

                        {allChartData.map(({ name, count, kcal }) => (
                            <div key={name} className={styles.cardContentItem}>
                                <Divider />
                                <div className={styles.cardContentItemInfo}>
                                    <div className={styles.chartCardFood}>
                                        <div className={styles.chartCardFoodDot} style={{ backgroundColor: mealColors[name].color }}></div>
                                        <div>{name}</div>
                                    </div>
                                    <div>({count})</div>
                                    <div className={styles.chartCardFood}>{kcal}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.foodCard}>
                    <div className={styles.foodCardTitle}>Съеденная пища</div>

                    <div className={styles.cardContent}>
                        <div className={styles.cardContentItem}>
                            <div className={styles.cardContentItemInfo}>
                                <div>Продукты</div>
                                <div>Кол-во приемов</div>
                                <div>Калории</div>
                            </div>
                        </div>

                        {eatenFood.map(({ name, count, kcal }) => (
                            <div key={name} className={styles.cardContentItem}>
                                <Divider />
                                <div className={styles.cardContentItemInfo}>
                                    <div>{name}</div>
                                    <div>{`x${count}=`}</div>
                                    <div>{kcal}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
};
