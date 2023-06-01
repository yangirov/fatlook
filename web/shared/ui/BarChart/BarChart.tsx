import React, { FC } from 'react';

import { getPercents } from '@/core/utils';
import { getColor } from '@/web/shared/colors';

import styles from './BarChart.module.scss';

export type ChartData = {
    label: string;
    values: number[];
};

type BarChartProps = {
    colors?: string[];
    data: ChartData[];
    width: number;
    height: number;
    hasMiddleLine?: boolean;
};

export const BarChart: FC<BarChartProps> = ({ colors, data, width, height, hasMiddleLine = false }) => {
    const values = data.map(d => d.values.reduce((a, b) => a + b));
    const maxValue = Math.max(...values);

    const middleValue = values.reduce((a, b) => a + b) / data.length;
    const middleLine = (Number(getPercents(middleValue, maxValue, false)) / 100) * height;

    const barWidth = width / data.length;
    const barHeight = height / Math.floor(data[0].values.length / 2) ?? 2;

    const cumulativeHeight = new Array(data.length).fill(0);

    return (
        <div className={styles.barChart}>
            <div className={styles.barChartSvgWrapper} style={{ width, height }}>
                {hasMiddleLine && <div className={styles.barChartLine} style={{ bottom: middleLine }}></div>}

                <svg
                    className={styles.barChartSvg}
                    width={width}
                    height={height}
                    style={{ backgroundSize: `${barWidth}px ${barHeight}px` }}
                >
                    {data.map(({ values }, index) => {
                        return values.map((value, i) => {
                            const segmentHeight = (value / maxValue) * height;
                            const y = height - cumulativeHeight[index] - segmentHeight;

                            cumulativeHeight[index] += segmentHeight;

                            return (
                                <rect
                                    className={styles.barChartRect}
                                    key={`${index}-${i}`}
                                    x={index * barWidth + 5}
                                    y={y}
                                    width={barWidth - 10}
                                    height={segmentHeight}
                                    fill={getColor(colors, i)}
                                />
                            );
                        });
                    })}
                </svg>
            </div>

            <div className={styles.barChartLabels}>
                {data.map(({ label }) => (
                    <div key={label} style={{ width: barWidth }} className={styles.barChartLabelsItem}>
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};
