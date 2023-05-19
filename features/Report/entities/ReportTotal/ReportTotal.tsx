import { FC, useContext } from 'react';

import { useAppSelector } from '@/shared/store';
import { PartialFoodDetailsKeys, foodKeysMap } from '@/shared/types';

import { ReportContext } from '../../Report';

import styles from './ReportTotal.module.scss';

const ReportTotal: FC = () => {
    const {
        report: { total },
    } = useContext(ReportContext);

    const visibleColumns = useAppSelector(state => state.report.visibleColumns);

    const keys: PartialFoodDetailsKeys = [...visibleColumns, 'kcal'];

    return (
        <div className={styles.reportTotal}>
            {keys.map(k => (
                <div key={k} className={styles.reportTotalItem}>
                    <div className={styles.reportTotalItemKey}>{foodKeysMap[k]?.shortName}</div>
                    <div className={styles.reportTotalItemValue}>{Math.floor(total[k] as number) ?? '0'}</div>
                </div>
            ))}
        </div>
    );
};

export default ReportTotal;
