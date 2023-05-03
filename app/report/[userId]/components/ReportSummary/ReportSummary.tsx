import { FC, useContext } from 'react';

import { REPORT_CALC_RATIO, REPORT_SUMMARY_COLORS, FoodUnit, PartialFoodDetailsKeys, UnitInfo, unitMap } from '@/shared/types';
import { Divider, PieChart, PieChartData } from '@/shared/ui';

import { ReportContext } from '../../Report';

import styles from './ReportSummary.module.scss';

const FormatUnit: FC<{ unit?: UnitInfo; value: FoodUnit }> = ({ unit, value }) => (
    <div>
        {unit?.fullName}: {value ?? 0} {unit?.unitName}
    </div>
);

const ReportSummary: FC = () => {
    const {
        report: { total, weight, steps }
    } = useContext(ReportContext);

    const keys: PartialFoodDetailsKeys = ['allFat', 'cholesterol', 'sodium', 'carbohydrates', 'fiber', 'sugar', 'protein'];

    const pieChartItems: PartialFoodDetailsKeys = ['allFat', 'carbohydrates', 'protein'];
    const pieChartData = pieChartItems.map<PieChartData>(key => {
        const value = Number(total[key]);
        const coef = Number(REPORT_CALC_RATIO[key]);

        return {
            color: REPORT_SUMMARY_COLORS[key],
            name: unitMap[key]?.shortName ?? key.toString(),
            value: Math.floor(value * coef)
        };
    });

    return (
        <>
            <div className={styles.reportSummary}>
                <div>
                    {keys.map(key => (
                        <FormatUnit key={key} unit={unitMap[key]} value={total[key]} />
                    ))}

                    <div className={styles.reportHealth}>
                        {weight && <div>Вес: {weight} кг</div>}
                        {steps && <div>Шаги: {steps} шагов</div>}
                    </div>
                </div>
                <PieChart data={pieChartData} />
            </div>
            <Divider />
        </>
    );
};

export default ReportSummary;
