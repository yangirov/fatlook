import { isEmpty } from '@/shared/utils';
import { Report } from './Report';

type RouteParams = {
    params?: { [key: string]: string };
    searchParams?: { [key: string]: string };
};

const getData = async (query: RouteParams) => {
    const { params, searchParams } = query;

    if (params && !isEmpty(params) && !isEmpty(searchParams)) {
        const queryString = new URLSearchParams({ userId: params.userId, ...searchParams });
        const response = await fetch(`${process.env.DOMAIN}/api/report?${queryString}`);
        const report = await response.json();
        return { report };
    }

    return null;
};

export default async function ReportPage(params: RouteParams) {
    const props = await getData(params);
    return <Report {...props} />;
}
