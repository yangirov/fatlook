import { FC } from 'react';

import { IconButton } from '@/shared/ui';
import { BackIcon, SettingsIcon } from '@/shared/icons';

import styles from './ReportHeader.module.scss';

export type ReportHeaderProps = {
    date: string;
};

const ReportHeader: FC<ReportHeaderProps> = ({ date }) => {
    return (
        <>
            <header className={styles.reportHeader}>
                <IconButton href="/">
                    <BackIcon />
                </IconButton>
                <div className={styles.reportHeaderDate}>{date}</div>
                <IconButton onClick={() => alert('Будут настройки')}>
                    <SettingsIcon />
                </IconButton>
            </header>
        </>
    );
};

export default ReportHeader;
