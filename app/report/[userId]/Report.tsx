'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { FoodDetails, NutritionData } from '@/shared/types';
import { Spinner } from '@/shared/ui';

import ReportHeader from './components/ReportHeader';
import ReportSummary from './components/ReportSummary';
import ReportMeals from './components/ReportMealsList';
import ReportTotal from './components/ReportTotal';

import styles from './Report.module.scss';

const tableList: Array<Partial<keyof FoodDetails>> = ['protein', 'fat', 'fiber', 'carbohydrates'];

const Report: FC = () => {
    const params = useParams();
    const searchParams = useSearchParams();

    let weight;
    let steps;

    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState<NutritionData | undefined>();

    useEffect(() => {
        setIsLoading(true);

        fetch(`/api/report?userId=${params?.userId}&${searchParams}`)
            .then(res => res.json())
            .then(({ report }) => {
                setReport(report);
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (!report || report?.meals?.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>Ничего не найдено</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ReportHeader date={report.date} />

            <div className={styles.report}>
                <ReportTotal visibleItems={[...tableList, 'kcal']} total={report.total} />
                <ReportMeals visibleItems={tableList} meals={report.meals} />
                <ReportSummary total={report.total} />

                {weight && steps && (
                    <div className={styles.total}>
                        <div>Вес: {weight} кг</div>
                        <div>Шаги: {steps} шагов</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Report;
