import { NextApiRequest, NextApiResponse } from 'next';

import { getHealthData, getStatsData } from '@fatlook/backend/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const stats = await getStatsData(req);

        const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;
        if (MONGO_URI) {
            const healthData = await getHealthData(req, MONGO_URI);

            if (healthData) {
                stats.healthData = healthData;
            }
        }

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при загрузке отчета' });
    }
}
