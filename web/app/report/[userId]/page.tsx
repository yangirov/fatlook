import { Report } from '@/web/features/Report';
import { RouteParams, getReport } from '@/web/shared/api';

export default async function ReportPage(routeParams: RouteParams) {
    const report = await getReport(routeParams);
    return <Report {...report} />;
}
