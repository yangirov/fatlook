import { FC, useContext } from 'react';

import { unitMap } from '@/shared/types';

import { ReportContext } from '../../Report';

import styles from './ReportTotal.module.scss';

const ReportTotal: FC = () => {
    const {
        visibleItems,
        report: { total }
    } = useContext(ReportContext);

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
