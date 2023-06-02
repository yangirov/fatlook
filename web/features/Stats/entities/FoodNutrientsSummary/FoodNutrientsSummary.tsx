import { FC, useContext } from 'react';

import { FoodDetails, foodKeysMap } from '@/core/types';
import { Entries, isEmpty } from '@/core/utils';

import { StatsContext } from '../../Stats';
import { FoodCard } from '../FoodCard';

import styles from './FoodNutrientsSummary.module.scss';

type CardInfo = {
    name: string;
    all: string;
};

export const FoodNutrientsSummary: FC = () => {
    const {
        stats: { totalData },
    } = useContext(StatsContext);

    if (!totalData || isEmpty(totalData)) {
        return null;
    }

    const items = (Object.entries(totalData.data) as Entries<FoodDetails>).reduce<CardInfo[]>((acc, [key, value]) => {
        const dto: CardInfo = {
            name: foodKeysMap[key]?.fullName ?? '-',
            all: value !== null ? `${value} ${foodKeysMap[key]?.unitName}` : '-',
        };

        acc.push(dto);
        return acc;
    }, []);

    return (
        <FoodCard
            extraClassNames={{ item: styles.nutrientsSummaryItem }}
            title="Питательные вещества"
            columns={{ name: 'Питательное вещество', all: 'Всего' }}
            items={items}
        />
    );
};
