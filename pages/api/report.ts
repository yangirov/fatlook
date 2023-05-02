import { NextApiRequest, NextApiResponse } from 'next';

import { ReportData } from '@/shared/types';
import { isEmpty, getFoodDiaryLink, parseFatSecretCSV } from '@/shared/utils';

const getReportFromFatSecret = async (req: NextApiRequest): Promise<ReportData | null> => {
    const { query } = req;

    if (!query || isEmpty(query)) {
        return null;
    }

    const { userId, date, weight, steps, name } = query;

    let report = {
        weight: weight as string,
        steps: steps as string,
        name: name as string
    } as ReportData;

    if (userId && date) {
        const fatSecretReportUrl = getFoodDiaryLink(userId.toString(), date.toString());

        const response = await fetch(fatSecretReportUrl);
        const reportCsv = await response.text();

        report = { ...report, ...parseFatSecretCSV(reportCsv) };
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
