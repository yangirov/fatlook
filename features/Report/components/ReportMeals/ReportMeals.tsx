import { FC, useContext } from 'react';

import { ReportContext } from '../../Report';
import ReportMeal from '../ReportMeal';

const ReportMeals: FC = () => {
    const {
        report: { data },
    } = useContext(ReportContext);

    return (
        <>
            {data[0].meals?.map(meal => (
                <ReportMeal key={meal.name} meal={meal} />
            ))}
        </>
    );
};

export default ReportMeals;
