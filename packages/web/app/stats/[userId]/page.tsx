import { Stats } from '@/web/features/Stats';
import { RouteParams, getStats } from '@/web/shared/api';

export default async function StatsPage(routeParams: RouteParams) {
    const stats = await getStats(routeParams);
    return <Stats {...stats} />;
}
