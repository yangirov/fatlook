'use client';
import { FC, useContext } from 'react';

import { FoodDetails, foodKeysMap } from '@/web/shared/types';
import { Entries } from '@/web/shared/utils';

import { StatsContext } from '../../Stats';
import { FoodCard } from '../FoodCard';

import styles from './FoodNutrientsSummary.module.scss';

type CardInfo = {
    name: string;
    all: string;
};

export const FoodNutrientsSummary: FC = () => {
    const {
        data: {
            totalData: { data },
        },
    } = useContext(StatsContext);

    const items = (Object.entries(data) as Entries<FoodDetails>).reduce<CardInfo[]>((acc, [key, value]) => {
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
