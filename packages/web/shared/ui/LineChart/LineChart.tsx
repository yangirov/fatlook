import React, { FC } from 'react';

import { formatDate, isEmpty } from '@fatlook/core/utils';

import styles from './LineChart.module.scss';

type LineChartProps = {
    data: {
        date: Date;
        value: number;
    }[];
    width: number;
    height: number;
};

export const LineChart: FC<LineChartProps> = ({ data, width, height }) => {
    const originalHeight = height;
    height -= 20;

    if (!data || isEmpty(data)) {
        return (
            <svg className={styles.lineChart} width={width} height={height}>
                <text x={width / 2} y={height / 2} dominantBaseline="middle" textAnchor="middle">
                    Нет данных
                </text>
            </svg>
        );
    }

    const minX = Math.min(...data.map(item => item.date.getTime()));
    const maxX = Math.max(...data.map(item => item.date.getTime()));
    const minY = Math.min(...data.map(item => item.value));
    const maxY = Math.max(...data.map(item => item.value));

    const getSvgX = (x: number) => ((x - minX) / (maxX - minX)) * width;

    const getSvgY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

    const renderPath = () => {
        let pathD = `M ${getSvgX(data[0].date.getTime())} ${getSvgY(data[0].value)}`;

        for (let i = 1; i < data.length; i++) {
            const point = data[i];
            pathD += `L ${getSvgX(point.date.getTime())} ${getSvgY(point.value)}`;
        }

        return (
            <g>
                <path className={styles.lineChartPath} d={pathD} />

                {data.map((point, index) => (
                    <circle
                        key={index}
                        cx={getSvgX(point.date.getTime())}
                        cy={getSvgY(point.value)}
                        r={3}
                        stroke="green"
                        fill="white"
                    />
                ))}
            </g>
        );
    };

    const renderArea = () => {
        let areaD = `M ${getSvgX(data[0].date.getTime())} ${height}`;
        areaD += `L ${getSvgX(data[0].date.getTime())} ${getSvgY(data[0].value)}`;

        for (let i = 1; i < data.length; i++) {
            const point = data[i];
            areaD += `L ${getSvgX(point.date.getTime())} ${getSvgY(point.value)}`;
        }

        areaD += `L ${getSvgX(data[data.length - 1].date.getTime())} ${height}`;

        return <path opacity={0.2} fill="green" d={areaD} />;
    };

    const renderLabels = () => {
        const groupedData = data.reduce<{ [key: string]: number[] }>((acc, item) => {
            const month = formatDate(item.date, 'MMMM yyyy');

            if (!acc[month]) acc[month] = [];
            acc[month].push(item.value);

            return acc;
        }, {});

        const labels = Object.keys(groupedData);

        const labelWidth = width / labels.length;
        const labelSpacing = labelWidth / 2;

        return (
            <g className={styles.lineChartLabels}>
                {labels.map((label, index) => (
                    <text key={index} x={index * labelWidth + labelSpacing} y={originalHeight - 5}>
                        {label}
                    </text>
                ))}
            </g>
        );
    };

    return (
        <svg className={styles.lineChart} width={width} height={originalHeight} fill="green">
            {renderArea()}
            {renderPath()}
            {renderLabels()}
        </svg>
    );
};
