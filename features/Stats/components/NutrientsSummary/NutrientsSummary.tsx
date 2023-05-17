import { FC, useContext } from 'react';

import { FoodDetails, foodKeysMap } from '@/shared/types';
import { Entries } from '@/shared/utils';

import { StatsContext } from '../../Stats';
import { FoodCard } from '../FoodCard';

import styles from './NutrientsSummary.module.scss';

type CardInfo = {
    name: string;
    all: string | number;
};

export const NutrientsSummary: FC = () => {
    const {
        data: {
            totalData: { data }
        }
    } = useContext(StatsContext);

    const items = (Object.entries(data) as Entries<FoodDetails>).reduce<CardInfo[]>((acc, [key, value]) => {
        const dto: CardInfo = {
            name: foodKeysMap[key]?.fullName ?? '-',
            all: value !== null ? value : '-'
        };

        acc.push(dto);
        return acc;
    }, []);

    return <FoodCard title="Питательные вещества" columns={{ name: 'Питательное вещество', all: 'Всего' }} items={items} />;
};
