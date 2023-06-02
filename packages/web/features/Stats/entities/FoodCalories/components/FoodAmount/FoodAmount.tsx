import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';

import { isEmpty } from '@fatlook/core/utils';

import { MEAL_COLORS } from '@/web/shared/colors';
import { useCurrentUser } from '@/web/shared/hooks';
import { BarChart, Card, Divider } from '@/web/shared/ui';

import { StatsContext } from '../../../../Stats';

import styles from './FoodAmount.module.scss';

const CHART_MEAL_COLORS = Object.values(MEAL_COLORS).map(m => m.color);

export const FoodAmount: FC = () => {
    const user = useCurrentUser();

    const {
        stats: { allEatenFood, totalData, allMeals, chartData },
    } = useContext(StatsContext);

    const chartRef = useRef<HTMLDivElement>(null);
    const [barWidth, setBarWidth] = useState<number | null>(null);
    useLayoutEffect(() => {
        if (chartRef && chartRef.current) {
            setBarWidth(chartRef.current.offsetWidth);
        }
    }, [chartRef]);

    if (!allEatenFood || isEmpty(allEatenFood) || !totalData || isEmpty(totalData)) {
        return null;
    }

    return (
        <Card>
            <div className={styles.amountCardSubTitle}>Калории</div>
            <div className={styles.amountCardTitle}>{allEatenFood.kcal}</div>

            <div className={styles.amountCardDaily}>
                <div>Среднесуточная норма: {Math.floor(allEatenFood.kcal / totalData.count)}</div>
                <div>Цель: {user?.dailyAmount}</div>
            </div>

            <div className={styles.amountCardChart} ref={chartRef}>
                {barWidth && (
                    <BarChart
                        hasMiddleLine={true}
                        data={chartData}
                        colors={CHART_MEAL_COLORS}
                        width={barWidth}
                        height={125}
                    />
                )}
            </div>

            <div>
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
