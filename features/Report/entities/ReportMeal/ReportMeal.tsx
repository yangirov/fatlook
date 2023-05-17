import { FC, useContext } from 'react';
import classNames from 'classnames';
import { SlArrowUp } from 'react-icons/sl';

import { Icon } from '@/shared/ui';
import { Meal, MEAL_ICONS } from '@/shared/types';
import { Accordion, AccordionContext } from '@/shared/ui';
import { useAppSelector } from '@/shared/store';
import { Colors } from '@/shared/colors';

import ReportFood from '../ReportFood';

import styles from './ReportMeal.module.scss';

export type ReportMealProps = {
    meal: Meal;
};

const ReportMealHeader: FC<ReportMealProps> = ({ meal }) => {
    const { isOpen, setOpen } = useContext(AccordionContext);
    const visibleColumns = useAppSelector(state => state.report.visibleColumns);

    return (
        <div className={classNames(styles.reportMealHeader, { [styles.reportMealHeaderExpanded]: isOpen })}>
            <div className={styles.reportMealHeaderPrime}>
                <div className={styles.reportMealHeaderPrimeIcon}>{MEAL_ICONS[meal.name]}</div>
                <div className={styles.reportMealHeaderPrimeInfo}>
                    <div className={styles.reportMealHeaderPrimeTitle}>
                        <div>{meal.name}</div>
                        {meal.total.kcal && (
                            <div>
                                <div className={styles.reportMealHeaderPrimeTitleKcal}>{meal.total.kcal}</div>
                                <div className={styles.reportMealHeaderPrimeTitleKcalText}>Калории</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {meal.foods.length !== 0 ? (
                <div className={styles.reportMealHeaderTotal} onClick={() => setOpen(prev => !prev)}>
                    <div className={styles.reportMealHeaderTotalItems}>
                        {visibleColumns.map(k => (
                            <div key={k}>{meal.total[k] ?? 0}</div>
                        ))}
                    </div>
                    <div className={styles.reportMealHeaderTotalToggler}>
                        <Icon>
                            <SlArrowUp color={Colors.GREEN} />
                        </Icon>
                    </div>
                </div>
            ) : (
                <div className={styles.reportMealEmpty}>Пусто</div>
            )}
        </div>
    );
};

const ReportMeal: FC<ReportMealProps> = ({ meal }) => {
    return (
        <div className={styles.reportMeal}>
            <Accordion>
                <Accordion.Header>
                    <ReportMealHeader meal={meal} />
                </Accordion.Header>
                <Accordion.Content>
                    {meal.foods.map(food => (
                        <ReportFood key={food.name} food={food} />
                    ))}
                </Accordion.Content>
            </Accordion>
        </div>
    );
};

export default ReportMeal;
