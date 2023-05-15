import { RouteParams, getReport } from '@/shared/utils';
import { Report } from '@/features/Report';

export default async function ReportPage(params: RouteParams) {
    const report = await getReport(params);
    return <Report {...report} />;
}
