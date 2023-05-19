import { FC } from 'react';
import classNames from 'classnames';

import { getPercents } from '@/shared/utils';
import { getColor } from '@/shared/colors';

import styles from './PieChart.module.scss';

type PieChartProps = {
    size?: number;
    className?: string;
    data: {
        name: string;
        value: number;
        color?: string;
    }[];
};

export const PieChart: FC<PieChartProps> = ({ className, size = 80, data }) => {
    const sizeStyle = { '--pieChartSize': `${size}px` } as React.CSSProperties;

    const total = data.reduce((a, b) => a + b.value, 0);
    if (total === 0) {
        return null;
    }

    const radius = size / 2;
    let offset = 0;

    return (
        <div className={classNames(styles.pieChart, className)} style={sizeStyle}>
            <svg className={styles.pieChartSvg} width={size} height={size}>
                <g transform={`translate(${radius},${radius})`}>
                    {data.map(({ color, name, value }) => {
                        const percentage = value / total;
                        const angle = 2 * Math.PI * percentage;
                        const largeArcFlag = percentage > 0.5 ? 1 : 0;

                        const startAngle = offset * Math.PI * 2;
                        const endAngle = startAngle + angle;

                        const startX = radius * Math.sin(startAngle);
                        const startY = -radius * Math.cos(startAngle);
                        const endX = radius * Math.sin(endAngle);
                        const endY = -radius * Math.cos(endAngle);

                        offset += percentage;

                        return (
                            <path
                                key={name}
                                d={`M 0 0 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                                fill={color ?? getColor()}
                            />
                        );
                    })}
                    <circle className={styles.pieChartCenterOuter} cx={0} cy={0} r={radius / 2} />
                    <path
                        className={styles.pieChartCenterInner}
                        d={`M 0 0 L 0 -${radius / 2} A ${radius / 2} ${radius / 2} 0 1 1 0 ${radius / 2} Z`}
                    />
                </g>
            </svg>
            <div className={styles.pieChartLegend}>
                {data.map(({ color, name, value }) => {
                    return (
                        <div key={name} className={styles.pieChartLegendItem}>
                            <span className={styles.pieChartLegendItemText}>
                                {name}: {getPercents(value, total)}
                            </span>
                            <span
                                className={styles.pieChartLegendItemColor}
                                style={{ backgroundColor: color ?? getColor() }}
                            ></span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
