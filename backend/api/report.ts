import { NextRequest } from 'next/server';

import { FoodDetails, ReportData } from '@/core/types';
import { getReportLink, parseFatSecretCSV, formatDate, REPORT_TYPES, ReportType } from '@/core/utils';

import { getQueryParams } from '../utils';

const initialReport: ReportData = {
    date: formatDate(new Date()),
    total: {} as FoodDetails,
    data: [],
};

export const getReportFromFatSecret = async (req: NextRequest): Promise<ReportData> => {
    let report = initialReport;

    const query = getQueryParams(req);
    if (!query) {
        return report;
    }

    const { type, userId, hash } = query;

    let { date } = query;
    if (!date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        date = formatDate(yesterday);
    }

    let reportType = REPORT_TYPES.DAY;
    if (type && Object.values(REPORT_TYPES).includes(type as ReportType)) {
        reportType = type as ReportType;
    }

    if (userId) {
        const fatSecretReportUrl = getReportLink(userId, date, reportType, hash);

        const response = await fetch(fatSecretReportUrl);
        const reportCsv = await response.text();
        const parsedReport = parseFatSecretCSV(reportCsv);

        report = { ...report, ...parsedReport, date };
    }

    return report;
};
