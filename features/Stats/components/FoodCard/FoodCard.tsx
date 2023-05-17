import classNames from 'classnames';

import { Divider } from '@/shared/ui';

import styles from './FoodCard.module.scss';

type FoodCardBase = { name: string; [key: string]: string | number };

type FoodCardProps<T extends FoodCardBase> = {
    title: string;
    columns: { [key in Partial<keyof T>]: string };
    items: T[];
    extraClassNames?: {
        wrapper?: string;
        content?: string;
        item?: string;
    };
};

export const FoodCard = <T extends FoodCardBase>({ title, columns, items, extraClassNames }: FoodCardProps<T>) => {
    return (
        <div className={classNames(styles.foodCard, extraClassNames?.wrapper)}>
            <div className={styles.foodCardTitle}>{title}</div>

            <div className={classNames(styles.foodCardContent, extraClassNames?.content)}>
                {items.map(item => (
                    <div key={item.name} className={classNames(styles.foodCardItem, extraClassNames?.item)}>
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
