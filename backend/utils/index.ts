import { NextRequest } from 'next/server';

import { isEmpty } from '@/core/utils';

export const getQueryParams = (
    req: NextRequest
): {
    [k: string]: string | undefined;
} | null => {
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    if (!query || isEmpty(query)) {
        return null;
    }

    return query;
};
