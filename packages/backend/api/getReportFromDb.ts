import { NextApiRequest } from 'next';

import { ReportData } from '@fatlook/core/types';

import { isEmpty } from '@fatlook/core/utils';

import { ReportModel } from '../data-access/models';
import { ReportService } from '../services';

// FIXME: reduce values from HK later
export const getReportFromDb = async (req: NextApiRequest, connectionString: string): Promise<ReportData | null> => {
    const { query } = req;

    if (!query || isEmpty(query)) {
        return null;
    }

    const reportService = new ReportService(ReportModel);

    try {
        if (query) {
            await reportService.connect(connectionString);

            const report = await reportService.get(query);
            return !report ? null : (report as ReportData);
        }
    } catch (e) {
        console.log(e);
    } finally {
        await reportService.disconnect();
    }

    return null;
};
