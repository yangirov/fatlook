import { ReportPageProps } from '@/pages/ReportPage/ReportPage';
import { isEmpty, getFoodDiaryLink, parseFatSecretCSV } from '@/shared/utils';
import { format, parse } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

const getReportFromFatSecret = async (req: NextApiRequest): Promise<ReportPageProps> => {
    const { query } = req;
    let searchParams = { ...query };

    if (!searchParams || isEmpty(searchParams)) {
        return {
            report: undefined,
            weight: undefined,
            steps: undefined
        };
    }

    const { q } = searchParams;
    if (q) {
        const buffer = Buffer.from(q.toString(), 'base64');
        const strParams = buffer.toString();

        searchParams = strParams.split('&').reduce<{ [key: string]: string }>((acc, p) => {
            const [k, v] = p.split('=');
            acc[k] = v;
            return acc;
        }, {});
    }

    const { userId, date, weight, steps } = searchParams;

    let report;

    if (userId && date) {
        const parsedDate = date.toString() ?? format(new Date(), 'yyMd');

        const fatSecretReportUrl = getFoodDiaryLink(userId.toString(), parse(parsedDate, 'yyMd', new Date()));
        const response = await fetch(fatSecretReportUrl);
        const reportCsv = await response.text();

        report = parseFatSecretCSV(reportCsv);
    }

    return {
        report,
        weight,
        steps
    };
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
