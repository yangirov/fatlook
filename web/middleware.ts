import { NextRequest, NextResponse } from 'next/server';

import { getReportFromFatSecret, getStatsData } from '@/backend/api';

type RequestType = 'GET' | 'POST';

const REQUEST_TYPE: Record<string, RequestType> = {
    GET: 'GET',
    POST: 'POST',
};

type ApiRoute = { type: RequestType; method: (req: NextRequest) => void };

const API_ROUTES: Record<string, ApiRoute> = {
    report: {
        type: REQUEST_TYPE.GET,
        method: getReportFromFatSecret,
    },
    stats: {
        type: REQUEST_TYPE.GET,
        method: getStatsData,
    },
};

const getRoute = (url?: string) => {
    if (!url) {
        return undefined;
    }

    const { pathname } = new URL(url);
    const routeName = pathname.split('?')[0].split('/').pop();
    return routeName !== undefined && API_ROUTES[routeName];
};

export default async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api')) {
        try {
            const route = getRoute(req.url);

            if (route && req.method) {
                const result = await route.method(req);

                if (['GET', 'POST'].includes(req.method)) {
                    return NextResponse.json(result, { status: 200 });
                } else {
                    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
                }
            } else {
                return NextResponse.json({ error: 'Метод не найден' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ error: 'Возникла ошибка при загрузке данных' }, { status: 500 });
        }
    }

    return NextResponse.next();
}
