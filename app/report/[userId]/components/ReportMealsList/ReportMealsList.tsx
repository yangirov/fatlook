import { FC, useContext } from 'react';

import { ReportContext } from '../../Report';
import ReportMeal from '../ReportMeal';

const ReportMeals: FC = () => {
    const {
        report: { meals }
    } = useContext(ReportContext);
    return (
        <>
            {meals.map(meal => (
                <ReportMeal key={meal.name} meal={meal} />
            ))}
        </>
    );
};

export default ReportMeals;
