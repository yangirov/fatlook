import { FC, memo } from 'react';
import { useMonth, FirstDayOfWeek } from '@datepicker-react/hooks';

import Day from '../Day';

import styles from './Month.module.scss';

type MonthProps = {
    year: number;
    month: number;
    firstDayOfWeek?: FirstDayOfWeek;
};

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const Month: FC<MonthProps> = ({ year, month, firstDayOfWeek }) => {
    const { days } = useMonth({
        year,
        month,
        firstDayOfWeek,
    });

    return (
        <>
            <div className={styles.monthDayLabels}>
                {dayLabels.map((dayLabel: string) => (
                    <div key={dayLabel}>{dayLabel}</div>
                ))}
            </div>

            <div className={styles.monthDays}>
                {days.map((day, index) =>
                    typeof day !== 'number' ? <Day key={day.dayLabel} date={day.date} /> : <div key={index}></div>
                )}
            </div>
        </>
    );
};

export default memo(Month);
