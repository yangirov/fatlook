import { FC, useContext } from 'react';
import classNames from 'classnames';

import { Icon } from '@/shared/ui';
import { Meal, mealIconMap } from '@/shared/types';
import { Accordion, AccordionContext, Colors } from '@/shared/ui';

import { SlArrowUp } from 'react-icons/sl';

import { ReportContext } from '../../Report';
import ReportFood from '../ReportFood';

import styles from './ReportMeal.module.scss';

export type ReportMealProps = {
    meal: Meal;
};

const Toggler: FC = () => {
    const { isOpen, setOpen } = useContext(AccordionContext);

    const onToggle = () => {
        setOpen(prev => !prev);
    };

    return (
        <div
            className={classNames(styles.mealToggler, {
                [styles.mealTogglerCollapsed]: !isOpen
            })}
            onClick={onToggle}
        >
            <Icon>
                <SlArrowUp color={Colors.GREEN} />
            </Icon>
        </div>
    );
};

const HeaderInfo: FC<ReportMealProps> = ({ meal }) => {
    const { isOpen } = useContext(AccordionContext);
    const { visibleItems } = useContext(ReportContext);

    return (
        <>
            <div className={styles.reportMealHeader}>
                <div className={styles.reportMealHeaderIcon}>{mealIconMap[meal.name]}</div>
                <div className={styles.reportMealHeaderInfo}>
                    <div
                        className={classNames(styles.reportMealHeaderTitle, {
                            [styles.reportMealHeaderTitleExpanded]: isOpen
                        })}
                    >
                        <div>{meal.name}</div>
                        {meal.total.kcal && (
                            <div>
                                <div className={styles.reportMealHeaderTitleKcal}>{meal.total.kcal}</div>
                                <div className={styles.reportMealHeaderTitleKcalText}>Калории</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {meal.foods.length !== 0 ? (
                <div
                    className={classNames(styles.reportMealHeaderTotal, {
                        [styles.reportMealHeaderTotalCollapsed]: !isOpen
                    })}
                >
                    <div className={styles.reportMealHeaderTotalItems}>
                        {visibleItems.map(k => (
                            <div key={k}>{meal.total[k] ?? 0}</div>
                        ))}
                    </div>
                    <Toggler></Toggler>
                </div>
            ) : (
                <div className={styles.reportMealEmpty}>Пусто</div>
            )}
        </>
    );
};

const ReportMeal: FC<ReportMealProps> = ({ meal }) => {
    return (
        <div className={styles.reportMeal}>
            <Accordion>
                <Accordion.Header>
                    <HeaderInfo meal={meal} />
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
