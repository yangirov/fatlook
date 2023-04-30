import { FC, useContext } from 'react';
import classnames from 'classnames';

import { BackIcon } from '@/shared/icons';
import { FoodDetails, Meal, mealIconMap } from '@/shared/types';
import { Accordion, AccordionContext, Colors } from '@/shared/ui';

import ReportFood from '../ReportFood';

import styles from './ReportMeal.module.scss';

export type ReportMealProps = {
    visibleItems: Array<Partial<keyof FoodDetails>>;
    meal: Meal;
};

const Toggler: FC = () => {
    const { isOpen, setOpen } = useContext(AccordionContext);

    const onToggle = () => {
        setOpen(prev => !prev);
    };

    return (
        <div
            className={classnames(styles.mealToggler, {
                [styles.mealTogglerCollapsed]: !isOpen
            })}
            onClick={onToggle}
        >
            <BackIcon color={Colors.GREEN}></BackIcon>
        </div>
    );
};

const HeaderInfo: FC<ReportMealProps> = ({ visibleItems, meal }) => {
    const { isOpen } = useContext(AccordionContext);

    return (
        <>
            <div className={styles.reportMealHeader}>
                <div className={styles.reportMealHeaderIcon}>{mealIconMap[meal.name]}</div>
                <div className={styles.reportMealHeaderInfo}>
                    <div
                        className={classnames(styles.reportMealHeaderTitle, {
                            [styles.reportMealHeaderTitleExpanded]: isOpen
                        })}
                    >
                        <div>{meal.name}</div>
                        <div>
                            <div className={styles.reportMealHeaderTitleKcal}>{meal.total.kcal}</div>
                            <div className={styles.reportMealHeaderTitleKcalText}>Калории</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={classnames(styles.reportMealHeaderTotal, {
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
        </>
    );
};

const ReportMeal: FC<ReportMealProps> = ({ visibleItems, meal }) => {
    return (
        <div className={styles.reportMeal}>
            <Accordion>
                <Accordion.Header>
                    <HeaderInfo visibleItems={visibleItems} meal={meal} />
                </Accordion.Header>
                <Accordion.Content>
                    {meal.foods.length !== 0 ? (
                        meal.foods.map(food => <ReportFood key={food.name} food={food} visibleItems={visibleItems} />)
                    ) : (
                        <div className={styles.foodItemEmpty}>Пусто</div>
                    )}
                </Accordion.Content>
            </Accordion>
        </div>
    );
};

export default ReportMeal;
