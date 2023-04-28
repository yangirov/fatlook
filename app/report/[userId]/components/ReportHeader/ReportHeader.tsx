import { FC } from 'react';

import styles from './ReportHeader.module.scss';

export type ReportHeaderProps = {
    date: string;
};

const ReportHeader: FC<ReportHeaderProps> = ({ date }) => (
    <header className={styles.reportHeader}>
        <div className={styles.reportHeaderDate}>{date}</div>
    </header>
);

export default ReportHeader;
