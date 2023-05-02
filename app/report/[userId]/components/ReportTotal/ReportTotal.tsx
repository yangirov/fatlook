import { FC, useContext } from 'react';

import { PartialFoodDetailsKeys, unitMap } from '@/shared/types';

import { ReportContext } from '../../Report';

import styles from './ReportTotal.module.scss';

const ReportTotal: FC = () => {
    const {
        visibleItems,
        report: { total }
    } = useContext(ReportContext);

    const keys: PartialFoodDetailsKeys = [...visibleItems, 'kcal'];

    return (
        <div className={styles.reportTotal}>
            {keys.map(k => (
                <div key={k} className={styles.reportTotalItem}>
                    <div className={styles.reportTotalItemKey}>{unitMap[k]?.shortName}</div>
                    <div className={styles.reportTotalItemValue}>{Math.floor(total[k] as number) ?? '0'}</div>
                </div>
            ))}
        </div>
    );
};

export default ReportTotal;
