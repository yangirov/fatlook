import React, { FC } from 'react';

type BarChartProps = {
    data: number[][];
    width: number;
    height: number;
};

export const BarChart: FC<BarChartProps> = ({ data, width, height }) => {
    const maxValue = Math.max(...data.map(d => Math.max(...d)));
    const barWidth = width / data.length;

    return (
        <svg width={width} height={height}>
            {data.map((values, index) => {
                const segmentHeight = height / values.length;
                return values.map((value, i) => (
                    <rect
                        key={`${index}-${i}`}
                        x={index * barWidth}
                        y={height - (i + 1) * segmentHeight}
                        width={barWidth}
                        height={segmentHeight}
                        fill={`rgba(0, 123, 255, ${value / maxValue})`}
                    />
                ));
            })}
        </svg>
    );
};
