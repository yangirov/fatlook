import { NextApiRequest } from 'next';

import { ReportData } from '@fatlook/core/types';
import { isEmpty } from '@fatlook/core/utils';

import { ReportModel } from '../data-access/models';
import { ReportService } from '../services';

export const saveReport = async (req: NextApiRequest, connectionString: string): Promise<ReportData | null> => {
    const { query } = req;

    if (!query || isEmpty(query)) {
        return null;
    }

    const reportService = new ReportService(ReportModel);

    try {
        const payload = {
            userId: query?.userId,
            ...req?.body,
        };

        await reportService.connect(connectionString);

        if (query) {
            const report = await reportService.create(payload);
            return !report ? null : (report as ReportData);
        }
    } catch (e) {
        console.log(e);
    } finally {
        await reportService.disconnect();
    }

    return null;
};
