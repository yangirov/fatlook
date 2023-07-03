import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';

import { formatDate, parseDate } from '@fatlook/core/utils';

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

    const middleWeight = Math.floor(
        healthData.reduce((acc, { weight }) => {
            acc += weight;
            return acc;
        }, 0) / healthData.length
    );

    const weightData = healthData.map(({ date, weight }) => ({
        date: parseDate(date),
        value: weight,
    }));

    return (
        <>
            <Card title="Вес">
                <div className={styles.weightCardHeader}>
                    <div className={styles.weightCardSubTitle}>
                        Среднее: <b>{middleWeight} кг</b>
                    </div>
                    {/* <div className={styles.weightCardSubTitle}>Цель: 70 кг</div> */}
                </div>

                <div className={styles.weightCardChart} ref={chartRef}>
                    {chartWidth && <LineChart data={weightData} width={chartWidth} height={125} />}
                </div>

                <div className={styles.weightCardContent}>
                    {weightData.reverse().map(({ date, value }, i, arr) => {
                        const { value: prev } = arr[i + 1] ?? arr[0];
                        const state = getWeightState(prev, value);

                        return (
                            <div key={date.getTime()}>
                                <Divider />
                                <div className={styles.weightCardItem}>
                                    <div className={styles.weightCardItemLabel}>{formatDate(date, 'EEE, d MMMM')}</div>
                                    <div>
                                        <span className={styles.weightCardItemText}>{value} кг</span> {state}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </>
    );
};
