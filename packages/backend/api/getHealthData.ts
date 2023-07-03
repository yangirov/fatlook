import { NextApiRequest } from 'next';

import { HealthData } from '@fatlook/core/types';

import { isEmpty } from '@fatlook/core/utils';

import { ReportModel } from '../data-access/models';
import { ReportService } from '../services';

export const getHealthData = async (req: NextApiRequest, connectionString: string): Promise<HealthData[] | null> => {
    const { query } = req;

    if (!query || isEmpty(query)) {
        return null;
    }

    const reportService = new ReportService(ReportModel);

    try {
        if (query) {
            await reportService.connect(connectionString);

            const report = await reportService.getAll(query);

            return !report ? null : (report as HealthData[]);
        }
    } catch (e) {
        console.log(e);
    } finally {
        await reportService.disconnect();
    }

    return null;
};
