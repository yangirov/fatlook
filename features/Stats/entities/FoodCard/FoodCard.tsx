import classNames from 'classnames';

import { Card, Divider } from '@/shared/ui';

import styles from './FoodCard.module.scss';

type FoodCardBase = { name: string; [key: string]: string | number };

type FoodCardProps<T extends FoodCardBase> = {
    title: string;
    columns: { [key in Partial<keyof T>]: string };
    items: T[];
    extraClassNames?: {
        item?: string;
        itemInfo?: string;
    };
};

export const FoodCard = <T extends FoodCardBase>({ title, columns, items, extraClassNames }: FoodCardProps<T>) => {
    return (
        <Card title={title}>
            {items.map(item => (
                <div key={item.name} className={classNames(styles.foodCardItem, extraClassNames?.item)}>
                    <Divider />
                    <div className={classNames(styles.foodCardInfo, extraClassNames?.itemInfo)}>
                        {Object.keys(columns).map((c, index) => (
                            <div key={c + index}>{item[c]}</div>
                        ))}
                    </div>
                </div>
            ))}
        </Card>
    );
};
