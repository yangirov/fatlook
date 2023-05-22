import { FC, useContext } from 'react';

import { StatsContext } from '../../Stats';
import { FoodDtoWithCount } from '../../types';
import { FoodCard } from '../FoodCard';

import { FoodAmount } from './components/FoodAmount';

import styles from './FoodCalories.module.scss';

export const FoodCalories: FC = () => {
    const {
        data: { eatenFood },
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
