import { FC, useContext } from 'react';
import classNames from 'classnames';

import { PartialFoodDetailsKeys, foodKeysMap } from '@/shared/types';
import { Divider } from '@/shared/ui';

import { StatsContext } from '../../Stats';

import styles from './FoodAverage.module.scss';

export const FoodAverage: FC = () => {
    const {
        data: {
            totalPeriodData: { data, count }
        }
    } = useContext(StatsContext);

    const columns: PartialFoodDetailsKeys = ['protein', 'allFat', 'fat', 'nonSaturatedFat', 'carbohydrates', 'fiber', 'sugar', 'sodium', 'cholesterol', 'kalium'];
    const importantColumns: PartialFoodDetailsKeys = ['protein', 'allFat', 'carbohydrates', 'fiber'];

    return (
        <div className={styles.foodAverage}>
            <div className={styles.foodAverageTitle}>Среднее за неделю</div>

            <div className={styles.foodAverageContent}>
                {columns.map(column => {
                    const value = Math.floor(+(data[column] ?? 0) / count);

                    return (
                        <div key={column} className={styles.foodAverageItem}>
                            <Divider />
                            <div className={classNames(styles.foodAverageInfo, { [styles.foodAverageInfoNotImportant]: !importantColumns.includes(column) })}>
                                <div className={styles.foodAverageInfoKey}>{foodKeysMap[column]?.fullName}</div>
                                <div className={styles.foodAverageInfoValue}>
                                    {value} {foodKeysMap[column]?.unitName}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
