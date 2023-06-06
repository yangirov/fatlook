import { NextApiRequest } from 'next';

import { FoodDetails, ReportData } from '@fatlook/core/types';
import { getReportLink, parseFatSecretCSV, formatDate, REPORT_TYPES, ReportType, isEmpty } from '@fatlook/core/utils';

const initialReport: ReportData = {
    date: formatDate(new Date()),
    total: {} as FoodDetails,
    data: [],
};

export const getReportFromFatSecret = async (req: NextApiRequest): Promise<ReportData> => {
    let report = initialReport;

    const { query } = req;
    if (!query || isEmpty(query)) {
        return report;
    }

    let { date, userId, hash } = query;
    if (!date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        date = formatDate(yesterday);
    }

    const { type } = query;
    let reportType = REPORT_TYPES.DAY;
    if (type && Object.values(REPORT_TYPES).includes(type as ReportType)) {
        reportType = type as ReportType;
    }

    if (userId) {
        date = date.toString();
        userId = userId.toString();
        hash = hash?.toString();

        const fatSecretReportUrl = getReportLink(userId, date, reportType, hash);

        const response = await fetch(fatSecretReportUrl);
        const reportCsv = await response.text();
        const parsedReport = parseFatSecretCSV(reportCsv);

        report = { ...report, ...parsedReport, date };
    }

    return report;
};
