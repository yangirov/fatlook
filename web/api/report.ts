import { NextApiRequest, NextApiResponse } from 'next';

import { ReportData } from '@/web/shared/types';
import { isEmpty, getReportLink, parseFatSecretCSV, formatDate, REPORT_TYPES, ReportType } from '@/web/shared/utils';

// TODO: Refactor dates
const getReportFromFatSecret = async (req: NextApiRequest): Promise<ReportData | null> => {
    const { query } = req;

    if (!query || isEmpty(query)) {
        return null;
    }

    const { type, userId, weight, steps } = query;
    let { date } = query;

    let report = {
        userId: userId as string,
        weight: weight as string,
        steps: steps as string,
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
        const fatSecretReportUrl = getReportLink(userId.toString(), date.toString(), reportType);

        const response = await fetch(fatSecretReportUrl);
        const reportCsv = await response.text();

        report = { ...report, ...parseFatSecretCSV(reportCsv), date: date.toString() };
    }

    return report;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const report = await getReportFromFatSecret(req);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при загрузке отчета' });
    }
}
