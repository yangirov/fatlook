import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';

import { MEAL_COLORS } from '@/web/shared/colors';
import { BarChart, Card, Divider } from '@/web/shared/ui';

import { StatsContext } from '../../../../Stats';

import styles from './FoodAmount.module.scss';

export const FoodAmount: FC = () => {
    const {
        data: { allEatenFood, totalData, allMeals, dailyAmount, chartData },
    } = useContext(StatsContext);

    const chartRef = useRef<HTMLDivElement>(null);
    const chartMealColors = Object.values(MEAL_COLORS).map(m => m.color);

    const [barWidth, setBarWidth] = useState<number | null>(null);
    useLayoutEffect(() => {
        if (chartRef && chartRef.current) {
            setBarWidth(chartRef.current.offsetWidth);
        }
    }, [chartRef]);

    return (
        <Card>
            <div className={styles.amountCardSubTitle}>Калории</div>
            <div className={styles.amountCardTitle}>{allEatenFood.kcal}</div>

            <div className={styles.amountCardDaily}>
                <div>Среднесуточная норма: {Math.floor(allEatenFood.kcal / totalData.count)}</div>
                <div>Цель: {dailyAmount}</div>
            </div>

            <div className={styles.amountCardChart} ref={chartRef}>
                {barWidth && (
                    <BarChart
                        hasMiddleLine={true}
                        data={chartData}
                        colors={chartMealColors}
                        width={barWidth}
                        height={125}
                    />
                )}
            </div>

            <div className={styles.amountCardContent}>
                <div className={styles.amountCardItem}>
                    <div className={styles.amountCardInfo}>
                        <div></div>
                        <div></div>
                        <div>Калории</div>
                    </div>
                </div>

                {allMeals.map(({ name, percents, kcal }) => (
                    <div key={name} className={styles.amountCardItem}>
                        <Divider />
                        <div className={styles.amountCardInfo}>
                            <div className={styles.amountCardFood}>
                                <div
                                    className={styles.amountCardFoodDot}
                                    style={{ backgroundColor: MEAL_COLORS[name]?.color }}
                                ></div>
                                <div>{name}</div>
                            </div>
                            <div>({percents})</div>
                            <div className={styles.amountCardFood}>{kcal}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
