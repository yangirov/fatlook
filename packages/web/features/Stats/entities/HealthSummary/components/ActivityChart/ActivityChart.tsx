import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';

import { capitalizeFirstLetter, formatDate, formatNumber, parseDate } from '@fatlook/core/utils';

import { useCurrentUser } from '@/web/shared/hooks';
import { BarChart, Card } from '@/web/shared/ui';

import { StatsContext } from '../../../../Stats';

import styles from './ActivityChart.module.scss';

const chartColors = Array.from({ length: 7 }, () => 'tomato');

export const ActivityChart: FC = () => {
    const user = useCurrentUser();

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

    const middle = Math.floor(
        healthData.reduce((acc, { steps }) => {
            acc += steps;
            return acc;
        }, 0) / healthData.length
    );

    const middleSteps = isNaN(middle) ? 0 : formatNumber(middle);

    const data = healthData.map(({ date, steps }) => ({
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
                    {user?.stepsGoal && <div className={styles.activityCardSubTitle}>Цель: {user?.stepsGoal}</div>}
                </div>

                <div className={styles.activityCardChart} ref={chartRef}>
                    {barWidth && (
                        <BarChart
                            hasMiddleLine={true}
                            hasVerticals={true}
                            data={data}
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
