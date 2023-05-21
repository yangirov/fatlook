import { Report } from '@/web/features/Report';
import { RouteParams, getReport } from '@/web/shared/utils';

export default async function ReportPage(params: RouteParams) {
    const report = await getReport(params);
    return <Report {...report} />;
}
