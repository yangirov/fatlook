import { FC } from 'react';
import classNames from 'classnames';

import { PieChartData, PieChartItem } from './types';

import styles from './PieChart.module.scss';

const colors = ['cornflowerblue', 'olivedrab', 'orange', 'tomato', 'crimson', 'purple', 'turquoise', 'forestgreen', 'navy', 'gray'];

type PieChartProps = {
    size?: number;
    className?: string;
    data: PieChartData[];
};

const sliceSize = (num: number, total: number) => (num / total) * 360;

const getPercents = (num: number, total: number) => `${Math.round(((num / total) * 10000) / 100)}%`;

export const PieChart: FC<PieChartProps> = ({ className, size, data }) => {
    const sizeStyle = { '--pieChartSize': `${size ?? 80}px` } as React.CSSProperties;

    const total = data.reduce((a, b) => a + b.value, 0);
    if (total === 0) return null;

    let offset = 0;
    const items = data.reduce<PieChartItem[]>((acc, { color, name, value }) => {
        const size = sliceSize(value, total);
        const sizeRotation = -179 + size;

        const oldOffset = offset;
        offset += size;

        if (!color) {
            color = colors[Math.floor(Math.random() * colors.length)];
        }

        acc.push({
            pie: (
                <div key={name} className={styles.pieChartSlice} style={{ transform: `rotate(${oldOffset}deg) translate3d(0,0,0)` }}>
                    <span style={{ transform: `rotate(${sizeRotation}deg) translate3d(0,0,0)`, backgroundColor: color }}></span>
                </div>
            ),
            legend: (
                <div key={name} className={styles.pieChartLegendItem}>
                    <span className={styles.pieChartLegendItemText}>
                        {name}: {getPercents(value, total)}
                    </span>
                    <span className={styles.pieChartLegendItemColor} style={{ backgroundColor: color }}></span>
                </div>
            )
        });

        return acc;
    }, []);

    return (
        <div className={classNames(styles.pieChart, className)} style={sizeStyle}>
            <div className={styles.pieChartCircle}>{items.map(({ pie }) => pie)}</div>
            <div className={styles.pieChartLegend}>{items.map(({ legend }) => legend)}</div>
        </div>
    );
};
