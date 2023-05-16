import { FC, useRef, useContext, memo } from 'react';
import { useDay } from '@datepicker-react/hooks';
import classNames from 'classnames';

import { formatDate } from '@/shared/utils';

import { DatePickerContext } from '../../DatePicker';

import styles from './Day.module.scss';

type DayProps = { date: Date };

const Day: FC<DayProps> = ({ date }) => {
    const dayRef = useRef(null);

    const { focusedDate, isDateFocused, isDateSelected, isDateHovered, isDateBlocked, isFirstOrLastSelectedDate, onDateSelect, onDateFocus, onDateHover } =
        useContext(DatePickerContext);

    const { isSelected, isSelectedStartOrEnd, disabledDate, onClick, onMouseEnter, tabIndex } = useDay({
        date,
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateFocus,
        onDateSelect,
        onDateHover,
        dayRef
    });

    return (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            tabIndex={tabIndex}
            ref={dayRef}
            className={classNames(styles.day, {
                [styles.daySelected]: isSelected || isSelectedStartOrEnd,
                [styles.dayDisabled]: disabledDate
            })}
        >
            {formatDate(date, 'd')}
        </div>
    );
};

export default memo(Day);
