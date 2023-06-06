import { NextApiRequest, NextApiResponse } from 'next';

import { getStatsData } from '@fatlook/backend/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const stats = await getStatsData(req);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при загрузке отчета' });
    }
}
