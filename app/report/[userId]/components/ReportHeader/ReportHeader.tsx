import { FC } from 'react';

import { IconButton } from '@/shared/ui';
import { BackIcon } from '@/shared/icons';

import styles from './ReportHeader.module.scss';

export type ReportHeaderProps = {
    date: string;
};

const ReportHeader: FC<ReportHeaderProps> = ({ date }) => {
    return (
        <>
            <header className={styles.reportHeader}>
                <IconButton href="/" className={styles.reportHeaderButton}>
                    <BackIcon />
                </IconButton>
                <div className={styles.reportHeaderDate}>{date}</div>
            </header>
        </>
    );
};

export default ReportHeader;
