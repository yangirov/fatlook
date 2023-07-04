import React, { FC } from 'react';

import { getPercents, isEmpty, shortenNumber } from '@fatlook/core/utils';

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
    hasVerticals?: boolean;
};

const getVerticalValues = (height: number, maxValue: number) => {
    const maxCount = 5;
    let count = 3;

    const step = Math.ceil(maxValue / (count - 1));

    const estimatedHeight = (step / maxValue) * height * (count - 1);
    if (count > 3 && estimatedHeight > height) {
        count = Math.floor(height / ((height / estimatedHeight) * step));
    }

    const labels = Array.from({ length: Math.min(maxCount, count) }).reduce<{ label: number; height: number }[]>(
        (acc, _, i) => {
            const label = Math.round((i * step) / 1000) * 1000;

            const previousHeight = acc.reduce((prev, item) => {
                prev += item.height;
                return prev;
            }, 0);

            const currentHeight = (label / maxValue) * (height - previousHeight);

            acc.push({ label, height: currentHeight });
            return acc;
        },
        []
    );

    return labels;
};

export const BarChart: FC<BarChartProps> = ({
    colors,
    data,
    width,
    height,
    hasMiddleLine = false,
    hasVerticals = false,
}) => {
    if (!data || isEmpty(data)) {
        return (
            <div className={styles.barChart}>
                <svg className={styles.barChartSvg} width={width} height={height}>
                    <text x={width / 2} y={height / 2} dominantBaseline="middle" textAnchor="middle">
                        Нет данных
                    </text>
                </svg>
            </div>
        );
    }

    const values = data.map(d => d.values.reduce((a, b) => a + b));
    const maxValue = Math.max(...values);

    const middleValue = values.reduce((a, b) => a + b) / data.length;
    const middleLine = (Number(getPercents(middleValue, maxValue, false)) / 100) * height;

    const barWidth = width / (hasVerticals ? data.length + 1 : data.length);
    const barHeight = height / Math.floor(data[0].values.length / 2) ?? 2;

    const cumulativeHeight = new Array(data.length).fill(0);

    const verticalLabels = getVerticalValues(height, maxValue);

    return (
        <div className={styles.barChart}>
            <div className={styles.barChartSvgWrapper} style={{ width, height }}>
                {hasMiddleLine && (
                    <div
                        className={styles.barChartLine}
                        style={{ width: hasVerticals ? width - barWidth : width, bottom: middleLine }}
                    ></div>
                )}

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
                {hasVerticals && <div style={{ width: barWidth }}></div>}
            </div>

            {hasVerticals && (
                <div className={styles.barChartLabelsVertical}>
                    {verticalLabels.reverse().map(({ label, height }) => (
                        <div key={label} style={{ width, height }} className={styles.barChartLabelsVerticalItem}>
                            <div
                                className={styles.barChartLabelsVerticalItemLine}
                                style={{ width: width - barWidth }}
                            ></div>
                            <div className={styles.barChartLabelsVerticalItemLabel}>{shortenNumber(label)}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
