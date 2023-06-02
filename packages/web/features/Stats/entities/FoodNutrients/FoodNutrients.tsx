import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';

import { foodKeysMap, nutrientsGoals } from '@fatlook/core/types';
import { capitalizeFirstLetter, formatDate, getPercents, isEmpty, parseDate } from '@fatlook/core/utils';

import { UNIT_COLORS } from '@/web/shared/colors';
import { BarChart, Card, ChartData, Divider } from '@/web/shared/ui';

import { StatsContext } from '../../Stats';
import { FoodCard } from '../FoodCard';

import styles from './FoodNutrients.module.scss';

export const FoodNutrients: FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    const [barWidth, setBarWidth] = useState<number | null>(null);
    useLayoutEffect(() => {
        if (chartRef && chartRef.current) {
            setBarWidth(chartRef.current.offsetWidth);
        }
    }, [chartRef]);

    const {
        stats: { eatenFood, totalData, foodDetails },
    } = useContext(StatsContext);

    if (!totalData || isEmpty(totalData) || !foodDetails || isEmpty(foodDetails)) {
        return null;
    }

    const legendKeys = ['carbohydrates', 'allFat', 'protein'];
    const legendTotalSum = legendKeys.reduce((a, b) => a + Number(totalData.data[b]), 0);
    const nutrientsData = legendKeys.map(f => ({
        key: f,
        percents: getPercents(Number(totalData.data[f]), legendTotalSum),
    }));

    const chartNutrientColors = Object.values(UNIT_COLORS).map(x => x ?? 'var(--gray)');
    const chartData = Object.entries(foodDetails).reduce<ChartData[]>((acc, [field, value]) => {
        const d = parseDate(field);
        const data = {
            label: `${capitalizeFirstLetter(formatDate(d, 'EEEEEE'))} ${formatDate(d, 'd')}`,
            values: legendKeys.map(k => Number(value[k])),
        };

        acc.push(data);
        return acc;
    }, []);

    return (
        <>
            <Card>
                <div className={styles.nutrientsTitle}>Макроэлементы</div>

                <div ref={chartRef}>
                    {barWidth && (
                        <BarChart data={chartData} colors={chartNutrientColors} width={barWidth} height={125} />
                    )}
                </div>

                <div className={styles.nutrientsContent}>
                    <div className={styles.nutrientsItem}>
                        <div className={styles.nutrientsInfo}>
                            <div></div>
                            <div>Всего</div>
                            <div>Цель</div>
                        </div>
                    </div>

                    {nutrientsData.map(({ key, percents }) => (
                        <div key={key} className={styles.nutrientsItem}>
                            <Divider />
                            <div className={styles.nutrientsInfo}>
                                <div className={styles.nutrientsFood}>
                                    <div
                                        className={styles.nutrientsFoodDot}
                                        style={{ backgroundColor: UNIT_COLORS[key] }}
                                    ></div>
                                    <div>{foodKeysMap[key]?.fullName}</div>
                                </div>
                                <div>{percents}</div>
                                <div>{nutrientsGoals[key]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <FoodCard
                title="Съеденная пища"
                columns={{ name: 'Продукты', carbohydrates: 'Углев (г)', fat: 'Жиры (г)', protein: 'Белк (г)' }}
                items={eatenFood}
            />
        </>
    );
};
