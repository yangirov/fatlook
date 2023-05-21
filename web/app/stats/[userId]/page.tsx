import { Stats } from '@/web/features/Stats';
import { RouteParams, getReport } from '@/web/shared/utils';

export default async function StatsPage(params: RouteParams) {
    const report = await getReport(params);
    return <Stats {...report} />;
}
