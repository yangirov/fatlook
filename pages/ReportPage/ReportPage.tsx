'use client';
import { FC } from 'react';

import { NutritionData, mealIconMap, unitMap } from '@/shared/types';

import styles from './ReportPage.module.scss';

export interface ReportPageProps {
    report?: NutritionData;
    weight?: string | string[];
    steps?: string | string[];
}

const tableList = ['protein', 'fat', 'fiber', 'carbohydrates'];

const ReportPage: FC<ReportPageProps> = ({ report, weight, steps }) => {
    if (!report || report?.meals?.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>Ничего не найдено</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerDate}>{report.date}</div>
            </header>

            <div className={styles.report}>
                <div className={styles.reportTotal}>
                    {Object.entries(report.total)
                        .filter(([k]) => ['protein', 'fat', 'fiber', 'carbohydrates'].includes(k))
                        .map(([k, v]) => (
                            <div key={k}>
                                <div className={styles.reportTotalKey}>{unitMap[k][0]}</div>
                                <div className={styles.reportTotalValue}>{Math.floor(v as number)}</div>
                            </div>
                        ))}
                    <div>
                        <div className={styles.reportTotalKey}>Калории</div>
                        <div className={styles.reportTotalValue}>
                            <b>{Math.floor(report.total.kcal as number)}</b>
                        </div>
                    </div>
                </div>

                {report.meals.map(meal => (
                    <div key={meal.name} className={styles.meal}>
                        <div className={styles.mealHeader}>
                            <div className={styles.mealHeaderIcon}>{mealIconMap[meal.name]}</div>
                            <div className={styles.mealHeaderInfo}>
                                <div className={styles.mealHeaderTitle}>
                                    <div>{meal.name}</div>
                                    <div>
                                        <div className={styles.mealHeaderTitleKcal}>{meal.total.kcal}</div>
                                        <div className={styles.mealHeaderTitleKcalText}>Ккал</div>
                                    </div>
                                </div>
                                <div className={styles.mealHeaderTotal}>
                                    {Object.entries(meal.total)
                                        .filter(([k]) => tableList.includes(k))
                                        .map(([k, v]) => (
                                            <div key={k}>{v}</div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.mealInfo}>
                            {meal.foods.length > 1 &&
                                meal.foods.map(food => (
                                    <div key={food.name} className={styles.food}>
                                        <div className={styles.foodItem}>
                                            <div>{food.name}</div>
                                            <div className={styles.foodItemWeight}>{food.weight}</div>
                                            <div className={styles.foodItemTotal}>
                                                {Object.entries(food.details)
                                                    .filter(([k]) => tableList.includes(k))
                                                    .map(([k, v]) => (
                                                        <div key={k}>{v ?? 0}</div>
                                                    ))}
                                            </div>
                                        </div>
                                        <div className={styles.foodItemKcal}>{food.details.kcal}</div>
                                    </div>
                                ))}

                            {meal.foods.length === 0 && <div className={styles.foodItemEmpty}>Пусто</div>}
                        </div>
                    </div>
                ))}
            </div>

            {report.total && (
                <div className={styles.total}>
                    <div>Всего жиров: {(+(report.total.fat ?? 0) + +(report.total.nonSaturatedFat ?? 0)).toFixed(2)} г</div>
                    <div>Холестерин: {report.total.cholesterol} мг</div>
                    <div>Натрий: {report.total.sodium} мг</div>
                    <div>Углеводов: {report.total.carbohydrates} г</div>
                    <div>Клетчатка: {report.total.fiber} г</div>
                    <div>Сахар: {report.total.sugar} г</div>
                    <div>Белок: {report.total.protein} г</div>
                </div>
            )}

            {weight && steps && (
                <div className={styles.total}>
                    <div>Вес: {weight} кг</div>
                    <div>Шаги: {steps} шагов</div>
                </div>
            )}
        </div>
    );
};

export default ReportPage;
