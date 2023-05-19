import { Stats } from '@/features/Stats';
import { RouteParams, getReport } from '@/shared/utils';

export default async function StatsPage(params: RouteParams) {
    const report = await getReport(params);
    return <Stats {...report} />;
}
