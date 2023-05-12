import { RouteParams, getReportData } from '@/shared/utils';
import { Stats } from './components/Stats';

export default async function StatsPage(params: RouteParams) {
    const report = await getReportData(params);
    return <Stats {...report} />;
}
