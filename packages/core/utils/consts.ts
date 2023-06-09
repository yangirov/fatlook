import { Dictionary } from './types';

export const APP_NAME = 'FAT_LOOK';

export type ReportType = 'day' | 'week' | 'month';

export const REPORT_TYPES: Dictionary<ReportType> = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
};
