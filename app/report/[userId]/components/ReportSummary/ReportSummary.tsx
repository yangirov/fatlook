import { FC, useContext } from 'react';

import { FoodUnit, PartialFoodDetailsKeys, unitMap } from '@/shared/types';

import { ReportContext } from '../../Report';

import styles from './ReportSummary.module.scss';

const FormatUnit: FC<{ unitKey: string; unitValue: FoodUnit }> = ({ unitKey, unitValue }) => (
    <div>
        {unitMap[unitKey].fullName}: {unitValue} {unitMap[unitKey].unitName}
    </div>
);

const ReportSummary: FC = () => {
    const {
        report: { total }
    } = useContext(ReportContext);

    const { fat, nonSaturatedFat } = total;
    const keys: PartialFoodDetailsKeys = ['cholesterol', 'sodium', 'carbohydrates', 'fiber', 'sugar', 'protein'];

    // 1 г жира = 9,3 ккал; 1 г углеводов = 4,1 ккал; 1 г белка = 4,1 ккал
    // 2400
    // ж 115*9.3=1069
    // уг 157*4.1=643
    // блк 135*4.1=553

    return (
        <div className={styles.reportSummary}>
            <div>
                <div>Всего жиров: {(+(fat ?? 0) + +(nonSaturatedFat ?? 0)).toFixed(2)} г</div>
                {keys.map(key => (
                    <FormatUnit key={key} unitKey={key} unitValue={total[key]} />
                ))}
            </div>
            <div>111</div>
        </div>
    );
};

export default ReportSummary;
