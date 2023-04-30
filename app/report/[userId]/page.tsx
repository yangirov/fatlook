import { isEmpty } from '@/shared/utils';
import { Report } from './Report';
import { ReportData } from '@/shared/types';

type RouteParams = {
    params?: { [key: string]: string };
    searchParams?: { [key: string]: string };
};

const getData = async (query: RouteParams): Promise<{ report?: ReportData }> => {
    const { params, searchParams } = query;

    let report;

    if (params && !isEmpty(params) && !isEmpty(searchParams)) {
        const queryString = new URLSearchParams({ userId: params.userId, ...searchParams });
        const response = await fetch(`${process.env.DOMAIN}/api/report?${queryString}`);
        report = (await response.json()) as ReportData;
    }

    return { report };
};

export default async function ReportPage(params: RouteParams) {
    const props = await getData(params);
    return <Report {...props} />;
}
