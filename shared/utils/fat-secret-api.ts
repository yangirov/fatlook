import { startOfMonth } from 'date-fns';
import { ReportData } from '../types';
import { isEmpty } from './common';
import { parseDate, diffInDays, formatDate } from './dates';

export type ReportType = 'day' | 'week' | 'month';

export const REPORT_TYPES: { [key: string]: ReportType } = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month'
};

export type RouteParams = {
    params?: { [key: string]: string };
    searchParams?: { [key: string]: string };
};

export const getReportData = async (query: RouteParams) => {
    const { params, searchParams } = query;

    let report;

    if (params && !isEmpty(params)) {
        const queryString = new URLSearchParams({ userId: params.userId, ...searchParams });
        const response = await fetch(`${process.env.DOMAIN}/api/report?${queryString}`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        const json = await response.json();
        report = json as ReportData;
    }

    return { report };
};

export const getFoodDiaryLink = (userId: string, dateString: string, type: ReportType): string => {
    const date = parseDate(dateString);
    let daysDiff = diffInDays(date, new Date(0));

    if (type === REPORT_TYPES.MONTH) {
        dateString = formatDate(date, 'MMM_yy', {});
        daysDiff = diffInDays(startOfMonth(date), new Date(0)) + 1; // FIXME: This ugly hack
    }

    const salt = (Math.random() + 1).toString(36).substring(7).toUpperCase();

    return `${process.env.FATSECRET_URL}/export/${userId}/${salt}/${daysDiff}/${type}/food/FoodDiary_${dateString}_foods.csv?lang=ru&mkt=RU`;
};
