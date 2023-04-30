import { isEmpty } from '@/shared/utils';
import { Report } from './Report';
import { ReportData } from '@/shared/types';

type RouteParams = {
    params?: { [key: string]: string };
    searchParams?: { [key: string]: string };
};

const getData = async (query: RouteParams) => {
    const { params, searchParams } = query;

    let report;

    if (params && !isEmpty(params) && !isEmpty(searchParams)) {
        const queryString = new URLSearchParams({ userId: params.userId, ...searchParams });
        const response = await fetch(`${process.env.DOMAIN}/api/report?${queryString}`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        const json = await response.json();
        report = json as ReportData;
    }

    return { report };
};

export default async function ReportPage(params: RouteParams) {
    const report = await getData(params);
    return <Report {...report} />;
}
