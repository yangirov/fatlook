import { FC, useContext, useState } from 'react';
import Link from 'next/link';
import { VscGraph } from 'react-icons/vsc';
import { SlSettings, SlShare } from 'react-icons/sl';

import { Divider, Icon } from '@/shared/ui';

import { ReportContext } from '../../Report';
import { ReportSettings } from '../ReportSettings';

import styles from './ReportNavigation.module.scss';

const ReportNavigation: FC = () => {
    const {
        report: { userId }
    } = useContext(ReportContext);

    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {
        setIsOpen(prev => !prev);
    };

    const onShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    url: location.href,
                    title: 'Отчет'
                })
                .then(() => console.log)
                .catch(console.error);
        } else {
            navigator.clipboard.writeText(location.href);
        }
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
                <div className={styles.reportNavigationLink} onClick={onShare}>
                    <Icon className={styles.reportNavigationIcon} color="var(--green)">
                        <SlShare />
                    </Icon>
                    <div className={styles.reportNavigationText}>Поделиться</div>
                </div>
            </div>
            <ReportSettings isOpen={isOpen} onToggle={onToggle} />
        </>
    );
};

export default ReportNavigation;
