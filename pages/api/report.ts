import { format, parse } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

import { ReportData } from '@/shared/types';
import { isEmpty, getFoodDiaryLink, parseFatSecretCSV } from '@/shared/utils';

const getReportFromFatSecret = async (req: NextApiRequest): Promise<ReportData | null> => {
    const { query } = req;

    if (!query || isEmpty(query)) {
        return null;
    }

    const { userId, date, weight, steps } = query;

    let report = {
        weight: weight as string,
        steps: steps as string
    } as ReportData;

    if (userId && date) {
        const parsedDate = date.toString() ?? format(new Date(), 'yyMd');

        const fatSecretReportUrl = getFoodDiaryLink(userId.toString(), parse(parsedDate, 'yyMd', new Date()));
        const response = await fetch(fatSecretReportUrl);
        const reportCsv = await response.text();

        report = { ...report, ...parseFatSecretCSV(reportCsv) };
    }

    return report;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const report = await getReportFromFatSecret(req);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при загрузке отчета' });
    }
}
