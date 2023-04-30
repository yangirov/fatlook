import { FC, useContext } from 'react';

import { IconButton } from '@/shared/ui';
import { BackIcon, SettingsIcon } from '@/shared/icons';

import { ReportContext } from '../../Report';

import styles from './ReportHeader.module.scss';

const ReportHeader: FC = () => {
    const {
        report: { date }
    } = useContext(ReportContext);

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
