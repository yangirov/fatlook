import { FC, useContext } from 'react';

import { Divider } from '@/shared/ui';

import { StatsContext } from '../../Stats';

import styles from './FoodCard.module.scss';

export const FoodCard: FC = () => {
    const {
        data: { eatenFood }
    } = useContext(StatsContext);

    return (
        <div className={styles.foodCard}>
            <div className={styles.foodCardTitle}>Съеденная пища</div>

            <div className={styles.foodCardContent}>
                <div className={styles.foodCardItem}>
                    <div className={styles.foodCardInfo}>
                        <div>Продукты</div>
                        <div>Кол-во приемов</div>
                        <div>Калории</div>
                    </div>
                </div>

                {eatenFood.map(({ name, count, kcal }) => (
                    <div key={name} className={styles.foodCardItem}>
                        <Divider />
                        <div className={styles.foodCardInfo}>
                            <div>{name}</div>
                            <div>{`x${count}=`}</div>
                            <div>{kcal}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
