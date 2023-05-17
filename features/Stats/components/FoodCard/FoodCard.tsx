import { FC } from 'react';

import { Divider } from '@/shared/ui';

import styles from './FoodCard.module.scss';

type FoodCardBase = { name: string; [key: string]: string | number };

type FoodCardProps<T extends FoodCardBase> = {
    title: string;
    columns: { [key in Partial<keyof T>]: string };
    items: T[];
};

export const FoodCard = <T extends FoodCardBase>({ title, columns, items }: FoodCardProps<T>) => {
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
