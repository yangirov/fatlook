import { FC, useContext, useRef } from 'react';

import { BarChart, ChartData, Divider } from '@/shared/ui';
import { foodKeysMap } from '@/shared/types';
import { UNIT_COLORS } from '@/shared/colors';
import { capitalizeFirstLetter, formatDate, getPercents, parseDate } from '@/shared/utils';

import { FoodCard } from '../FoodCard';
import { StatsContext } from '../../Stats';

import styles from './FoodNutrients.module.scss';

const nutrientsGoals: { [key: string]: string } = {
    carbohydrates: '50%',
    allFat: '30%',
    protein: '20%'
};

export const FoodNutrients: FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const {
        data: { eatenFood, totalData, foodDetails }
    } = useContext(StatsContext);

    const legendKeys = ['carbohydrates', 'allFat', 'protein'];
    const legendTotalSum = legendKeys.reduce((a, b) => a + Number(totalData.data[b]), 0);
    const nutrientsData = legendKeys.map(f => ({
        key: f,
        percents: getPercents(Number(totalData.data[f]), legendTotalSum)
    }));

    const chartNutrientColors = Object.values(UNIT_COLORS).map(x => x ?? 'var(--gray)');
    const chartData = Object.entries(foodDetails).reduce<ChartData[]>((acc, [field, value]) => {
        const d = parseDate(field);
        const data = {
            label: `${capitalizeFirstLetter(formatDate(d, 'EEEEEE'))} ${formatDate(d, 'd')}`,
            values: legendKeys.map(k => Number(value[k]))
        };

        acc.push(data);
        return acc;
    }, []);

    return (
        <>
            <div className={styles.nutrients}>
                <div className={styles.nutrientsTitle}>Макроэлементы</div>

                <div className={styles.nutrientsChart} ref={chartRef}>
                    <BarChart data={chartData} colors={chartNutrientColors} width={chartRef?.current?.offsetWidth ?? 350} height={125} />
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
                                    <div className={styles.nutrientsFoodDot} style={{ backgroundColor: UNIT_COLORS[key] }}></div>
                                    <div>{foodKeysMap[key]?.fullName}</div>
                                </div>
                                <div>{percents}</div>
                                <div>{nutrientsGoals[key]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <FoodCard title="Съеденная пища" columns={{ name: 'Продукты', carbohydrates: 'Углев (г)', fat: 'Жиры (г)', protein: 'Белк (г)' }} items={eatenFood} />
        </>
    );
};
