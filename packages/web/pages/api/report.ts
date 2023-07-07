import { NextApiRequest, NextApiResponse } from 'next';

import { getReportFromDb, getReportFromFatSecret, saveReport } from '@fatlook/backend/api';
import { ReportData } from '@fatlook/core/types';

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!MONGO_URI) {
            throw new Error('Не задана строка подключения');
        }

        if (req.method === 'GET') {
            let report = {} as ReportData;

            const reportDb = await getReportFromDb(req, MONGO_URI);
            if (reportDb) {
                report.weight = reportDb.weight;
                report.steps = reportDb.steps;

                if (reportDb.hash) {
                    req.query.hash = reportDb.hash;
                }
            }

            const reportExternal = await getReportFromFatSecret(req);
            if (reportExternal) {
                report = { ...report, ...reportExternal };
            }

            res.status(200).json(report);
        }

        if (req.method === 'POST') {
            const report = await saveReport(req, MONGO_URI);
            res.status(200).json(report);
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при выполнении запроса отчета' });
    }
}
