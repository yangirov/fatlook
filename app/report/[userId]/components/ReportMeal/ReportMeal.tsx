import { FC } from 'react';

import { FoodDetails, Meal, mealIconMap } from '@/shared/types';

import ReportFood from '../ReportFood';

import styles from './ReportMeal.module.scss';

export type ReportMealProps = {
    visibleItems: Array<Partial<keyof FoodDetails>>;
    meal: Meal;
};

// const Toggler: FC<{ children: React.ReactNode }> = ({ children }) => {
//     const decoratedOnClick = () => console.log('totally custom!');

//     return (
//         <button type="button" style={{ backgroundColor: 'pink' }} onClick={decoratedOnClick}>
//             {children}
//         </button>
//     );
// };

const ReportMeal: FC<ReportMealProps> = ({ visibleItems, meal }) => {
    // const { setOpen } = useContext(AccordionContext);

    return (
        <div className={styles.reportMeal}>
            {/* <Accordion>
                <Accordion.Header> */}
            <div className={styles.reportMealHeader}>
                <div className={styles.reportMealHeaderIcon}>{mealIconMap[meal.name]}</div>
                <div className={styles.reportMealHeaderInfo}>
                    <div className={styles.reportMealHeaderTitle}>
                        <div>{meal.name}</div>
                        <div>
                            <div className={styles.reportMealHeaderTitleKcal}>{meal.total.kcal}</div>
                            <div className={styles.reportMealHeaderTitleKcalText}>Ккал</div>
                            {/* <Toggler>HI!</Toggler> */}
                        </div>
                    </div>
                    <div className={styles.reportMealHeaderTotal}>
                        {visibleItems.map(k => (
                            <div key={k}>{meal.total[k]}</div>
                        ))}
                    </div>
                </div>
            </div>
            {/* </Accordion.Header>
                <Accordion.Content> */}
            <div className={styles.reportMealInfo}>
                {meal.foods.length !== 0 ? (
                    meal.foods.map(food => <ReportFood key={food.name} food={food} visibleItems={visibleItems} />)
                ) : (
                    <div className={styles.foodItemEmpty}>Пусто</div>
                )}
            </div>
            {/* </Accordion.Content>
            </Accordion> */}
        </div>
    );
};

export default ReportMeal;
