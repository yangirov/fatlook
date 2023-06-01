import { startOfMonth, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

import { parseDate, diffInDays, formatDate } from './dates';

export type ReportType = 'day' | 'week' | 'month';

export const getUserId = (url: string) => {
    const regex = /^https:\/\/www\.fatsecret\.(?:[a-z]+)\/export\/(\d+)\/.*$/;
    const match = url.match(regex);

    if (match && match.length === 2) {
        const userId = match[1];
        return userId;
    } else {
        return null;
    }
};

export const REPORT_TYPES: { [key: string]: ReportType } = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
};

export const getReportLink = (userId: string, dateString: string, type: ReportType, hash?: string): string => {
    const date = parseDate(dateString);
    let daysDiff = diffInDays(date, new Date(0));

    if (type === REPORT_TYPES.MONTH) {
        dateString = formatDate(date, 'MMM_yy', {});
        daysDiff = diffInDays(startOfMonth(date), new Date(0)) + 1;
    }

    if (type === REPORT_TYPES.WEEK) {
        const start = startOfWeek(date, { locale: ru });
        dateString = formatDate(start);
        daysDiff = diffInDays(start, new Date(0)) + 1;
    }

    const salt = hash ? hash : (Math.random() + 1).toString(36).substring(7).toUpperCase();

    return `${process.env.NEXT_PUBLIC_FATSECRET_URL}/export/${userId}/${salt}/${daysDiff}/${type}/food/FoodDiary_${dateString}_foods.csv?lang=ru&mkt=RU`;
};
