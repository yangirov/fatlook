'use client';
import { FC, createContext } from 'react';
import { PartialFoodDetailsKeys, ReportData } from '@/shared/types';
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

type ReportProps = {
    report?: ReportData;
};

const visibleItems: PartialFoodDetailsKeys = ['protein', 'fat', 'fiber', 'carbohydrates'];

export const ReportContext = createContext<{ report: ReportData; visibleItems: PartialFoodDetailsKeys }>({
    report: {} as ReportData,
    visibleItems
});

export const Report: FC<ReportProps> = ({ report }) => {
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
        <ReportContext.Provider value={{ report, visibleItems }}>
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
                        <Link href="#" onClick={comingSoon} className={styles.reportNavigationLink}>
                            <Icon className={styles.reportNavigationIcon} color="var(--accent-green)">
                                <SlSettings />
                            </Icon>
                            <div className={styles.reportNavigationText}>Настройки</div>
                        </Link>
                    </div>
                </PageLayout.Content>
            </PageLayout>
        </ReportContext.Provider>
    );
};
