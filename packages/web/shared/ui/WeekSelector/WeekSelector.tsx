'use client';
import { FC, useEffect, useState } from 'react';

import { RxTriangleLeft, RxTriangleRight } from 'react-icons/rx';

import { formatDate, addDays, endOfWeek, startOfWeek } from '@fatlook/core/utils';

import styles from './WeekSelector.module.scss';

export type WeekSelectorProps = {
    date: Date;
    onChange: (date: Date) => void;
};

const formatWeek = (date: Date) => formatDate(date, 'dd MMM yy');
const weekStart = (date: Date, addedDays = 0) => startOfWeek(addDays(date, addedDays));
const weekEnd = (date: Date, addedDays = 0) => endOfWeek(addDays(date, addedDays));

const getWeekName = (date: Date) => {
    const today = new Date().getTime();

    const startWeek = date;
    const endWeek = weekEnd(date);

    if (startWeek.getTime() <= today && today <= endWeek.getTime()) {
        return 'Текущая неделя';
    }

    const weekAgo = addDays(today, -7).getTime();
    if (startWeek.getTime() <= weekAgo && weekAgo <= endWeek.getTime()) {
        return 'Прошлая неделя';
    }

    return `${formatWeek(startWeek)} – ${formatWeek(endWeek)}`;
};

export const WeekSelector: FC<WeekSelectorProps> = ({ date, onChange }) => {
    const [currentDate, setCurrentDate] = useState<Date>(date);
    const [weekName, setWeekName] = useState<string | null>(null);

    useEffect(() => {
        setWeekName(getWeekName(currentDate));
    }, [currentDate]);

    const onPrevWeek = () => {
        const previousWeek = weekStart(currentDate, -7);
        setCurrentDate(previousWeek);
        onChange(previousWeek);
    };

    const onNextWeek = () => {
        const nextWeek = weekStart(currentDate, 7);
        setCurrentDate(nextWeek);
        onChange(nextWeek);
    };

    return (
        <div className={styles.weekSelector}>
            <div className={styles.weekSelectorArrow} onClick={onPrevWeek}>
                <RxTriangleLeft />
            </div>
            <div className={styles.weekSelectorContent}>{weekName}</div>
            <div className={styles.weekSelectorArrow} onClick={onNextWeek}>
                <RxTriangleRight />
            </div>
        </div>
    );
};
