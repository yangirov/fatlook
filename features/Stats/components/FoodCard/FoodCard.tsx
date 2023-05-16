import { FC } from 'react';

import { Divider } from '@/shared/ui';

import { FoodDtoWithCount } from '../../types';

import styles from './FoodCard.module.scss';

type FoodCardProps = {
    title: string;
    columns: { [key in Partial<keyof FoodDtoWithCount>]: string };
    items: FoodDtoWithCount[];
};

export const FoodCard: FC<FoodCardProps> = ({ title, columns, items }) => {
    return (
        <div className={styles.foodCard}>
            <div className={styles.foodCardTitle}>{title}</div>

            <div className={styles.foodCardContent}>
                <div className={styles.foodCardItem}>
                    <div className={styles.foodCardInfo}>
                        {Object.values(columns).map((c, index) => (
                            <div key={c + index}>{c}</div>
                        ))}
                    </div>
                </div>

                {items.map(item => (
                    <div key={item.name} className={styles.foodCardItem}>
                        <Divider />
                        <div className={styles.foodCardInfo}>
                            {Object.keys(columns).map((c, index) => (
                                <div key={c + index}>{item[c]}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
