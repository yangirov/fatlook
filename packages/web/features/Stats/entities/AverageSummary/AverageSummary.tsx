import { FC, useContext, useState } from 'react';

import classNames from 'classnames';

import { FoodDetails, PartialFoodDetailsKeys, foodKeysMap } from '@fatlook/core/types';
import { isEmpty } from '@fatlook/core/utils';

import { Card, Divider, ToggleSwitch } from '@/web/shared/ui';

import { StatsContext } from '../../Stats';

import styles from './AverageSummary.module.scss';

export const AverageSummary: FC = () => {
    const [isMedianMode, setIsMedianMode] = useState(false);

    const {
        stats: { totalData, foodDetails },
    } = useContext(StatsContext);

    if (!totalData || isEmpty(totalData) || !foodDetails || isEmpty(foodDetails)) {
        return null;
    }

    const { data, count } = totalData;

    const importantColumns: PartialFoodDetailsKeys = ['protein', 'allFat', 'carbohydrates', 'fiber'];

    const columns: PartialFoodDetailsKeys = [
        'protein',
        'allFat',
        'fat',
        'saturatedFat',
        'carbohydrates',
        'fiber',
        'sugar',
        'sodium',
        'cholesterol',
        'kalium',
    ];

    const median = columns.reduce((acc, fieldKey) => {
        const values = Object.keys(foodDetails)
            .map(dateKey => {
                const value = foodDetails[dateKey][fieldKey];
                if (value === null) return 0;
                if (typeof value === 'string') return parseFloat(value);
                return value;
            })
            .sort((a, b) => a - b);

        const mid = Math.floor(values.length / 2);
        const medianValue = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];

        acc[fieldKey] = Math.floor(medianValue);
        return acc;
    }, {} as FoodDetails);

    return (
        <Card>
            <div className={styles.foodAverageHeader}>
                <div className={styles.foodAverageTitle}>{isMedianMode ? 'Медиана' : 'Среднее'}</div>
                <ToggleSwitch text="Медиана" checked={isMedianMode} onChange={setIsMedianMode} />
            </div>

            <div>
                {columns.map(column => {
                    const value = isMedianMode ? median[column] : Math.floor(+(data[column] ?? 0) / count);

                    return (
                        <div key={column} className={styles.foodAverageItem}>
                            <Divider />
                            <div
                                className={classNames(styles.foodAverageInfo, {
                                    [styles.foodAverageInfoNotImportant]: !importantColumns.includes(column),
                                })}
                            >
                                <div className={styles.foodAverageInfoKey}>{foodKeysMap[column]?.fullName}</div>
                                <div className={styles.foodAverageInfoValue}>
                                    {value} {foodKeysMap[column]?.unitName}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
