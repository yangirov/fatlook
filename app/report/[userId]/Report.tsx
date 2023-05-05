'use client';
import { FC, createContext, useState } from 'react';
import { ReportData } from '@/shared/types';
import { SlSettings } from 'react-icons/sl';
import { VscGraph } from 'react-icons/vsc';
import Link from 'next/link';

import { PageLayout } from '@/shared/layouts';
import { isEmpty } from '@/shared/utils';
import { Divider, Icon } from '@/shared/ui';

import ReportHeader from './components/ReportHeader';
import ReportSummary from './components/ReportSummary';
import ReportMeals from './components/ReportMeals';
import ReportTotal from './components/ReportTotal';

import styles from './Report.module.scss';
import { ReportSettings } from './components/ReportSettings';

type ReportProps = {
    report?: ReportData;
};

export const ReportContext = createContext<{ report: ReportData }>({
    report: {} as ReportData
});

export const Report: FC<ReportProps> = ({ report }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggle = () => {
        setIsOpen(prev => !prev);
    };

    const comingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        alert('В разработке');
    };

    if (!report || isEmpty(report.meals)) {
        return (
            <PageLayout>
                <PageLayout.Header>
                    <ReportHeader />
                </PageLayout.Header>

                <PageLayout.Content>
                    <div className={styles.empty}>Ничего не найдено 🙄</div>
                </PageLayout.Content>
            </PageLayout>
        );
    }

    return (
        <ReportContext.Provider value={{ report }}>
            <PageLayout>
                <PageLayout.Header>
                    <ReportHeader />
                </PageLayout.Header>

                <PageLayout.Content>
                    <ReportTotal />
                    <ReportMeals />
                    <ReportSummary />
                    <Divider />
                    <div className={styles.reportNavigation}>
                        <Link href="#" onClick={comingSoon} className={styles.reportNavigationLink}>
                            <Icon className={styles.reportNavigationIcon} color="var(--accent-green)">
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
                            <Icon className={styles.reportNavigationIcon} color="var(--accent-green)">
                                <SlSettings />
                            </Icon>
                            <div className={styles.reportNavigationText}>Настройки</div>
                        </Link>
                    </div>
                    <ReportSettings isOpen={isOpen} onToggle={onToggle} />
                </PageLayout.Content>
            </PageLayout>
        </ReportContext.Provider>
    );
};
