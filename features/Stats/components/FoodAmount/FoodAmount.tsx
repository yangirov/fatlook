import { FC, useContext, useRef } from 'react';

import { BarChart, Divider } from '@/shared/ui';
import { mealColors } from '@/shared/types';

import { StatsContext } from '../../Stats';

import styles from './FoodAmount.module.scss';

export const FoodAmount: FC = () => {
    const {
        data: { allEatenFood, allMealData, dailyAmount, chartData }
    } = useContext(StatsContext);

    const chartRef = useRef<HTMLDivElement>(null);
    const chartMealColors = Object.values(mealColors).map(m => m.color);

    return (
        <div className={styles.amountCard}>
            <div className={styles.amountCardSubTitle}>Калории</div>
            <div className={styles.amountCardTitle}>{allEatenFood.kcal}</div>

            <div className={styles.amountCardDaily}>
                <div>Среднесуточная норма: {Math.floor(allEatenFood.kcal / 6)}</div>
                <div>Цель: {dailyAmount}</div>
            </div>

            <div className={styles.amountCardChart} ref={chartRef}>
                <BarChart data={chartData} colors={chartMealColors} width={chartRef?.current?.offsetWidth ?? 350} height={125} />
            </div>

            <div className={styles.amountCardContent}>
                <div className={styles.amountCardItem}>
                    <div className={styles.amountCardInfo}>
                        <div></div>
                        <div></div>
                        <div>Калории</div>
                    </div>
                </div>

                {allMealData.map(({ name, percents, kcal }) => (
                    <div key={name} className={styles.amountCardItem}>
                        <Divider />
                        <div className={styles.amountCardInfo}>
                            <div className={styles.amountCardFood}>
                                <div className={styles.amountCardFoodDot} style={{ backgroundColor: mealColors[name].color }}></div>
                                <div>{name}</div>
                            </div>
                            <div>({percents})</div>
                            <div className={styles.amountCardFood}>{kcal}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
