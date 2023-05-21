import { FC, useContext, useState } from 'react';

import Link from 'next/link';
import { SlSettings, SlShare } from 'react-icons/sl';
import { VscGraph } from 'react-icons/vsc';

import { useSharePage } from '@/web/shared/hooks';
import { Divider, Icon } from '@/web/shared/ui';

import { ReportContext } from '../../Report';
import { ReportSettings } from '../ReportSettings';

import styles from './ReportNavigation.module.scss';

const ReportNavigation: FC = () => {
    const {
        report: { userId },
    } = useContext(ReportContext);

    const sharePage = useSharePage();
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {
        setIsOpen(prev => !prev);
    };

    const onShare = (e: React.MouseEvent) => {
        e.preventDefault();
        sharePage.share('Отчет');
    };

    return (
        <>
            <Divider />
            <div className={styles.reportNavigation}>
                <Link href={`/stats/${userId}?type=week`} className={styles.reportNavigationLink}>
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
                <Link href="" onClick={onShare} className={styles.reportNavigationLink}>
                    <Icon className={styles.reportNavigationIcon} color="var(--green)">
                        <SlShare />
                    </Icon>
                    <div className={styles.reportNavigationText}>Поделиться</div>
                </Link>
            </div>
            <ReportSettings isOpen={isOpen} onToggle={onToggle} />
        </>
    );
};

export default ReportNavigation;