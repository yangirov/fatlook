import { FC, useContext } from 'react';

import { formatNumber } from '@fatlook/core/utils';

import { Divider } from '@/web/shared/ui';

import { ReportContext } from '../../Report';

import styles from './ReportHealth.module.scss';

const ReportHealth: FC = () => {
    const {
        report: { weight, steps },
    } = useContext(ReportContext);

    if (!weight || !steps) {
        return null;
    }

    const healthItems = [
        { key: 'steps', name: 'Активность', value: `${formatNumber(steps)} шагов` },
        { key: 'weight', name: 'Вес', value: `${weight} кг` },
    ];

    return (
        <div className={styles.reportHealth}>
            <div className={styles.reportHealthHeader}>
                <div className={styles.reportHealthHeaderIcon}>❤️</div>
                <div>Здоровье</div>
            </div>
            <div className={styles.reportHealthContent}>
                {healthItems.map(({ key, name, value }, index) => (
                    <div key={key}>
                        <div className={styles.reportHealthContentItem}>
                            <div>{name}</div>
                            <div className={styles.reportHealthContentItemTotal}>{value}</div>
                        </div>
                        {index !== healthItems.length - 1 && <Divider />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportHealth;
