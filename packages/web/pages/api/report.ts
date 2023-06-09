import { NextApiRequest, NextApiResponse } from 'next';

import { getReportFromDb, getReportFromFatSecret, saveReport } from '@fatlook/backend/api';

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!MONGO_URI) {
            throw new Error('Не задана строка подключения');
        }

        if (req.method === 'GET') {
            const report = await getReportFromFatSecret(req);

            const reportFromDb = await getReportFromDb(req, MONGO_URI);
            if (reportFromDb) {
                report.weight = reportFromDb.weight;
                report.steps = reportFromDb.steps;
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