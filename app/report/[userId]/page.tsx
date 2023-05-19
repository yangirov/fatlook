import { Report } from '@/features/Report';
import { RouteParams, getReport } from '@/shared/utils';

export default async function ReportPage(params: RouteParams) {
    const report = await getReport(params);
    return <Report {...report} />;
}
