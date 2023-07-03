import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';

import { capitalizeFirstLetter, formatDate, parseDate } from '@fatlook/core/utils';

import { BarChart, Card } from '@/web/shared/ui';

import { StatsContext } from '../../../../Stats';

import styles from './ActivityChart.module.scss';

const chartColors = Array.from({ length: 7 }, () => 'tomato');

export const ActivityChart: FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    const [barWidth, setBarWidth] = useState<number | null>(null);
    useLayoutEffect(() => {
        if (chartRef && chartRef.current) {
            setBarWidth(chartRef.current.offsetWidth);
        }
    }, [chartRef]);

    const {
        stats: { healthData },
    } = useContext(StatsContext);

    const middleSteps = Math.floor(
        healthData.reduce((acc, { steps }) => {
            acc += steps;
            return acc;
        }, 0) / healthData.length
    );

    const stepsData = healthData.map(({ date, steps }) => ({
        label: `${capitalizeFirstLetter(formatDate(parseDate(date), 'EEEEEE'))} ${formatDate(parseDate(date), 'd')}`,
        values: [steps],
    }));

    return (
        <>
            <Card title="Шаги">
                <div className={styles.activityCardHeader}>
                    <div className={styles.activityCardSubTitle}>
                        Среднее: <b>{middleSteps} шагов</b>
                    </div>
                    {/* <div className={styles.activityCardSubTitle}>Цель: 15000</div> */}
                </div>

                <div className={styles.activityCardChart} ref={chartRef}>
                    {barWidth && (
                        <BarChart
                            hasMiddleLine={true}
                            hasVerticals={true}
                            data={stepsData}
                            colors={chartColors}
                            width={barWidth}
                            height={125}
                        />
                    )}
                </div>
            </Card>
        </>
    );
};
