import { FC, useState } from 'react';

import Link from 'next/link';
import { VscGraph } from 'react-icons/vsc';
import { SlSettings } from 'react-icons/sl';

import { Divider, Icon } from '@/shared/ui';

import styles from './ReportNavigation.module.scss';
import { ReportSettings } from '../ReportSettings';

export const ReportNavigation: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {
        setIsOpen(prev => !prev);
    };

    const comingSoon = (e: React.MouseEvent) => {
        e.preventDefault();

        alert('В разработке');
    };

    return (
        <>
            <Divider />
            <div className={styles.reportNavigation}>
                <Link href="#" onClick={comingSoon} className={styles.reportNavigationLink}>
                    <Icon className={styles.reportNavigationIcon} color="var(--green)">
                        <VscGraph />
                    </Icon>
                    <div className={styles.reportNavigationText}>Отчеты</div>
                </Link>
                <Link
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        onToggle();
                    }}
                    className={styles.reportNavigationLink}
                >
                    <Icon className={styles.reportNavigationIcon} color="var(--green)">
                        <SlSettings />
                    </Icon>
                    <div className={styles.reportNavigationText}>Настройки</div>
                </Link>
            </div>
            <ReportSettings isOpen={isOpen} onToggle={onToggle} />
        </>
    );
};
