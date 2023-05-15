import { FC, useContext } from 'react';

import { BarChart, Divider } from '@/shared/ui';
import { mealColors } from '@/shared/types';

import { StatsContext } from '../../Stats';

import styles from './FoodAmount.module.scss';

export const FoodAmount: FC = () => {
    const {
        data: { allEatenFood, allChartData, dailyAmount, chartData }
    } = useContext(StatsContext);

    const barData = [[5, 10, 15], [20, 25], [30], [10, 20, 30, 40]];

    return (
        <div className={styles.chartCard}>
            <div className={styles.chartCardSubTitle}>Калории</div>
            <div className={styles.chartCardTitle}>{allEatenFood.kcal}</div>

            <div className={styles.chartCardDaily}>
                <div>Среднесуточная норма: {Math.floor(allEatenFood.kcal / 6)}</div>
                <div>Цель: {dailyAmount}</div>
            </div>

            <BarChart data={barData} width={300} height={200} />

            <div className={styles.chartCardContent}>
                <div className={styles.chartCardItem}>
                    <div className={styles.chartCardInfo}>
                        <div></div>
                        <div></div>
                        <div>Калории</div>
                    </div>
                </div>

                {allChartData.map(({ name, percents, kcal }) => (
                    <div key={name} className={styles.chartCardItem}>
                        <Divider />
                        <div className={styles.chartCardInfo}>
                            <div className={styles.chartCardFood}>
                                <div className={styles.chartCardFoodDot} style={{ backgroundColor: mealColors[name].color }}></div>
                                <div>{name}</div>
                            </div>
                            <div>({percents})</div>
                            <div className={styles.chartCardFood}>{kcal}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
