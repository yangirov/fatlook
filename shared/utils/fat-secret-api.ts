import { startOfMonth, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

import { ReportData } from '../types';

import { isEmpty } from './common';
import { parseDate, diffInDays, formatDate } from './dates';
import { isDev } from './isDev';

export type ReportType = 'day' | 'week' | 'month';

export const REPORT_TYPES: { [key: string]: ReportType } = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
};

export type RouteParams = {
    params?: { [key: string]: string };
    searchParams?: { [key: string]: string };
};

export const getReport = async (query: RouteParams) => {
    const { params, searchParams } = query;

    let report = {} as ReportData;

    if (params && !isEmpty(params)) {
        const queryString = new URLSearchParams({ userId: params.userId, ...searchParams });
        const response = await fetch(`${process.env.DOMAIN}/api/report?${queryString}`, {
            cache: isDev ? 'default' : 'no-store',
            next: { revalidate: isDev ? 60 : 30 },
        });
        const json = await response.json();
        report = json as ReportData;
    }

    return { report };
};

export const getReportLink = (userId: string, dateString: string, type: ReportType): string => {
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

    const salt = (Math.random() + 1).toString(36).substring(7).toUpperCase();

    return `${process.env.FATSECRET_URL}/export/${userId}/${salt}/${daysDiff}/${type}/food/FoodDiary_${dateString}_foods.csv?lang=ru&mkt=RU`;
};
