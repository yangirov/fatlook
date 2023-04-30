import { FC } from 'react';

import { FoodDetails, unitMap, PartialFoodDetailsKeys } from '@/shared/types';

import styles from './ReportTotal.module.scss';

export type ReportTotalProps = {
    visibleItems: PartialFoodDetailsKeys;
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
