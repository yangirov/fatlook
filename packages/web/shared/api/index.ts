import { ReportData, StatsData } from '@fatlook/core/types';
import { Dictionary, isEmpty } from '@fatlook/core/utils';

export type RouteParams = {
    params?: Dictionary;
    searchParams?: Dictionary;
};

const getFromAPI = async <T>(path: string, query: RouteParams) => {
    const { params, searchParams } = query;

    let data = {} as T;

    if (params && !isEmpty(params)) {
        const domain = process.env.NEXT_PUBLIC_DOMAIN;
        const queryString = new URLSearchParams({ userId: params.userId, ...searchParams });

        const response = await fetch(`${domain}/api/${path}?${queryString}`, {
            next: { revalidate: 30 },
        });

        const json = await response.json();
        data = json as T;
    }

    return data;
};

export const getReport = async (query: RouteParams) => {
    const report = await getFromAPI<ReportData>('report', query);
    return { report };
};

export const getStats = async (query: RouteParams) => {
    const stats = await getFromAPI<StatsData>('stats', query);
    return { stats };
};
