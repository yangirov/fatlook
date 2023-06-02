import { FC, useContext } from 'react';

import classNames from 'classnames';

import { REPORT_CALC_RATIO, PartialFoodDetailsKeys, FoodUnit, FoodKeys, foodKeysMap } from '@fatlook/core/types';
import { getPercents } from '@fatlook/core/utils';

import { UNIT_COLORS } from '@/web/shared/colors';
import { useCurrentUser } from '@/web/shared/hooks';
import { Divider, PieChart } from '@/web/shared/ui';

import { ReportContext } from '../../Report';

import styles from './ReportSummary.module.scss';

const FormatUnit: FC<{ unit?: FoodKeys; value: FoodUnit }> = ({ unit, value }) => (
    <div>
        {unit?.fullName}: {value ?? 0} {unit?.unitName}
    </div>
);

const ReportSummary: FC = () => {
    const {
        report: { total },
    } = useContext(ReportContext);

    const user = useCurrentUser();

    const keys: PartialFoodDetailsKeys = [
        'allFat',
        'cholesterol',
        'sodium',
        'carbohydrates',
        'fiber',
        'sugar',
        'protein',
    ];

    const pieChartItems: PartialFoodDetailsKeys = ['allFat', 'carbohydrates', 'protein'];
    const pieChartData = pieChartItems.map(key => {
        const value = Number(total[key]);
        const ratio = Number(REPORT_CALC_RATIO[key]);

        return {
            color: UNIT_COLORS[key],
            name: foodKeysMap[key]?.shortName ?? key.toString(),
            value: Math.floor(value * ratio),
        };
    });

    const totalKcal = Number(total.kcal);
    const rsk = user?.dailyAmount;

    return (
        <>
            <div className={styles.dailyTitle}>Сводка</div>

            {rsk && (
                <>
                    <div className={styles.daily}>
                        <div className={styles.dailyInfo}>
                            <div>
                                <span>Осталось Калорий</span>
                                <span className={styles.dailyInfoBoldGray}>{Math.floor(+rsk - totalKcal)}</span>
                            </div>
                            <div>
                                <span>Употреблено Калорий</span>
                                <span className={styles.dailyInfoBold}>{totalKcal}</span>
                            </div>
                            <Divider />
                            <div className={styles.dailyInfoPercents}>
                                <span>{getPercents(totalKcal, rsk)} от РСК</span>
                                <span className={styles.dailyInfoBold}>{rsk}</span>
                            </div>
                        </div>

                        <div className={styles.dailyCube}>
                            {[...Array(100).keys()].map(x => (
                                <div
                                    key={x}
                                    className={classNames(styles.dailyCubeItem, {
                                        [styles.dailyCubeItemFilled]: rsk - (totalKcal / 100) * x < totalKcal,
                                    })}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <Divider />
                </>
            )}

            <div className={styles.summary}>
                <div>
                    {keys.map(key => (
                        <FormatUnit key={key} unit={foodKeysMap[key]} value={total[key]} />
                    ))}
                </div>
                <PieChart data={pieChartData} className={styles.summaryPieChart} />
            </div>
        </>
    );
};

export default ReportSummary;
