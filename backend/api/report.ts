import { NextRequest } from 'next/server';

import { ReportData } from '@/core/types';
import { isEmpty, getReportLink, parseFatSecretCSV, formatDate, REPORT_TYPES, ReportType } from '@/core/utils';

export const getReportFromFatSecret = async (req: NextRequest): Promise<ReportData | null> => {
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    if (!query || isEmpty(query)) {
        return null;
    }

    const { type, userId, salt } = query;
    let { date } = query;

    let report = {
        userId: userId as string,
    } as ReportData;

    if (!date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        date = formatDate(yesterday);
    }

    let reportType = REPORT_TYPES.DAY;
    if (type && Object.values(REPORT_TYPES).includes(type as ReportType)) {
        reportType = type as ReportType;
    }

    if (userId && date) {
        const hash = salt?.toString();
        const fatSecretReportUrl = getReportLink(userId.toString(), date.toString(), reportType, hash);

        const response = await fetch(fatSecretReportUrl);
        const reportCsv = await response.text();

        report = { ...report, ...parseFatSecretCSV(reportCsv), date: date.toString() };
    }

    return report;
};
