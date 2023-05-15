import { RouteParams, getReport } from '@/shared/utils';

import { Stats } from '@/features/Stats';

export default async function StatsPage(params: RouteParams) {
    const report = await getReport(params);
    return <Stats {...report} />;
}
