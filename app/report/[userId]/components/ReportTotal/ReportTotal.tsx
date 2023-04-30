import { FC } from 'react';

import { FoodDetails, unitMap } from '@/shared/types';

import styles from './ReportTotal.module.scss';

export type ReportTotalProps = {
    visibleItems: Array<Partial<keyof FoodDetails>>;
    total: FoodDetails;
};

const ReportTotal: FC<ReportTotalProps> = ({ visibleItems, total }) => {
    return (
        <div className={styles.reportTotal}>
            {visibleItems.map(k => (
                <div key={k} className={styles.reportTotalItem}>
                    <div className={styles.reportTotalItemKey}>{unitMap[k].shortName}</div>
                    <div className={styles.reportTotalItemValue}>{Math.floor(total[k] as number)}</div>
                </div>
            ))}
        </div>
    );
};

export default ReportTotal;
