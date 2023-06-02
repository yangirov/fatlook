import { FC, useContext } from 'react';

import { FoodDtoWithCount } from '@fatlook/core/types';

import { StatsContext } from '../../Stats';
import { FoodCard } from '../FoodCard';

import { FoodAmount } from './components/FoodAmount';

import styles from './FoodCalories.module.scss';

export const FoodCalories: FC = () => {
    const {
        stats: { eatenFood },
    } = useContext(StatsContext);

    const items = eatenFood.map(f => ({ ...f, count: `=x${f.count}` })) as FoodDtoWithCount[];

    return (
        <div className={styles.foodCalories}>
            <FoodAmount />
            <FoodCard
                title="Съеденная пища"
                columns={{ name: 'Продукты', count: 'Кол-во приемов', kcal: 'Калории' }}
                items={items}
            />
        </div>
    );
};
