import { FC } from 'react';

import { ActivityChart } from './components/ActivityChart';
import { WeightChart } from './components/WeightChart';

import styles from './ActivitySummary.module.scss';

export const HealthSummary: FC = () => {
    return (
        <>
            <ActivityChart />
            <WeightChart />
        </>
    );
};
