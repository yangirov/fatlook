'use client';
import { FC, createContext, memo, useState } from 'react';

import { useDatepicker, START_DATE, OnDatesChangeProps } from '@datepicker-react/hooks';

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { addDays, addMonths, isAfter } from '@fatlook/core/utils';

import { formatDate } from '@fatlook/core/utils';

import { Icon } from '../Icon';

import Month from './components/Month';

import styles from './DatePicker.module.scss';

type DatePickerProps = {
    date: Date | null;
    onDateChange: (date: Date | null) => void;
    onMonthChange: (month: string) => void;
};

type DatePickerContextDefaultValue = {
    focusedDate: Date | null;
    isDateSelected: (date: Date) => boolean;
    isDateHovered: (date: Date) => boolean;
    isDateFocused: (date: Date) => boolean;
    isDateBlocked: (date: Date) => boolean;
    isFirstOrLastSelectedDate: (date: Date) => boolean;
    onDateHover: (date: Date | null) => void;
    onDateSelect: (date: Date) => void;
    onDateFocus: (date: Date) => void;
};

export const DatePickerContext = createContext({} as DatePickerContextDefaultValue);

const DatePicker: FC<DatePickerProps> = ({ date, onDateChange, onMonthChange }) => {
    const [state, setState] = useState<OnDatesChangeProps>({
        startDate: date,
        endDate: null,
        focusedInput: START_DATE,
    });

    const handleDateChange = (data: OnDatesChangeProps) => {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
        } else {
            setState(data);
        }

        onDateChange(data.startDate);
    };

    const isDisabledDate = (date: Date) => isAfter(date, addDays(new Date(), 1));

    const {
        firstDayOfWeek,
        activeMonths,
        isDateSelected,
        isDateHovered,
        isFirstOrLastSelectedDate,
        isDateBlocked,
        isDateFocused,
        focusedDate,
        onDateHover,
        onDateSelect,
        onDateFocus,
        goToPreviousMonths,
        goToNextMonths,
    } = useDatepicker({
        startDate: state.startDate,
        endDate: null,
        focusedInput: state.focusedInput,
        onDatesChange: handleDateChange,
        isDateBlocked: isDisabledDate,
        numberOfMonths: 1,
    });

    const handleMonthChange = (addedMonths: number) => {
        const month = addMonths(activeMonths[0].date, addedMonths);
        const monthName = formatDate(month, 'LLLL, yyyy');

        onMonthChange(monthName);
    };

    const handlePrevMonth = () => {
        handleMonthChange(-1);
        goToPreviousMonths();
    };

    const handleNextMonth = () => {
        handleMonthChange(1);
        goToNextMonths();
    };

    return (
        <DatePickerContext.Provider
            value={{
                focusedDate,
                isDateFocused,
                isDateSelected,
                isDateHovered,
                isDateBlocked,
                isFirstOrLastSelectedDate,
                onDateSelect,
                onDateFocus,
                onDateHover,
            }}
        >
            <div className={styles.datePickerWrapper}>
                <div onClick={handlePrevMonth}>
                    <Icon>
                        <SlArrowLeft />
                    </Icon>
                </div>
                <div className={styles.datePicker}>
                    {activeMonths.map(month => (
                        <Month
                            key={month.month}
                            year={month.year}
                            month={month.month}
                            firstDayOfWeek={firstDayOfWeek}
                        />
                    ))}
                </div>
                <div onClick={handleNextMonth}>
                    <Icon>
                        <SlArrowRight />
                    </Icon>
                </div>
            </div>
        </DatePickerContext.Provider>
    );
};

export default memo(DatePicker);
