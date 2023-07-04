import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';

import { formatDate, parseDate } from '@fatlook/core/utils';

import { useCurrentUser } from '@/web/shared/hooks';
import { LineChart, Card, Divider } from '@/web/shared/ui';

import { StatsContext } from '../../../../Stats';

import styles from './WeightChart.module.scss';

const getWeightState = (prev: number, current: number) => {
    let state = '➖';

    if (current > prev) state = '⬆️';
    if (current < prev) state = '⬇️';

    return state;
};

export const WeightChart: FC = () => {
    const user = useCurrentUser();

    const chartRef = useRef<HTMLDivElement>(null);

    const [chartWidth, setBarWidth] = useState<number | null>(null);
    useLayoutEffect(() => {
        if (chartRef && chartRef.current) {
            setBarWidth(chartRef.current.offsetWidth);
        }
    }, [chartRef]);

    const {
        stats: { healthData },
    } = useContext(StatsContext);

    const average =
        healthData.reduce((acc, { weight }) => {
            acc += weight;
            return acc;
        }, 0) / healthData.length;

    const averageWeight = isNaN(average) ? 0 : average.toFixed(2);

    const data = healthData.map(({ date, weight }) => ({
        date: parseDate(date),
        value: weight,
    }));

    return (
        <>
            <Card title="Вес">
                <div className={styles.weightCardHeader}>
                    <div className={styles.weightCardSubTitle}>
                        Среднее: <b>{averageWeight} кг</b>
                    </div>
                    {user?.weightGoal && <div className={styles.weightCardSubTitle}>Цель: {user?.weightGoal} кг</div>}
                </div>

                <div className={styles.weightCardChart} ref={chartRef}>
                    {chartWidth && <LineChart data={data} width={chartWidth} height={125} />}
                </div>

                <div className={styles.weightCardContent}>
                    {data.reverse().map(({ date, value }, i, arr) => {
                        const { value: prevValue } = arr[i + 1] ?? arr[0];
                        const state = getWeightState(prevValue, value);

                        return (
                            <div key={date.getTime()}>
                                <div className={styles.weightCardItem}>
                                    <div className={styles.weightCardItemLabel}>{formatDate(date, 'EEE, d MMMM')}</div>
                                    <div>
                                        <span className={styles.weightCardItemText}>{value} кг</span> {state}
                                    </div>
                                </div>
                                <Divider index={i} count={data.length - 1} hideLast={true} />
                            </div>
                        );
                    })}
                </div>
            </Card>
        </>
    );
};
