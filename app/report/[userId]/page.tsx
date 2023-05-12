import { RouteParams, getReportData } from '@/shared/utils';
import { Report } from './Report';

export default async function ReportPage(params: RouteParams) {
    const report = await getReportData(params);
    return <Report {...report} />;
}
