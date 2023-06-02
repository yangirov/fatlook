import { useMemo } from 'react';

import { ReadonlyURLSearchParams, useParams, useSearchParams } from 'next/navigation';

import { StringDictionary } from '@fatlook/core/utils';

const mapParams = (record: Record<string, string | string[]>): StringDictionary =>
    Object.keys(record).reduce<StringDictionary>((acc, key) => {
        const value = record[key];

        if (typeof value === 'string') {
            acc[key] = value;
        } else if (Array.isArray(value)) {
            acc[key] = value.join(', ');
        }

        return acc;
    }, {});

const mapSearchParams = (params: ReadonlyURLSearchParams): StringDictionary =>
    Array.from(params.keys()).reduce<StringDictionary>((acc, key) => {
        acc[key] = params.get(key) || '';
        return acc;
    }, {});

export const useRouteParams = () => {
    const routeParams = useParams();
    const routeSearchParams = useSearchParams();

    const params = useMemo(() => {
        return routeParams ? mapParams(routeParams) : undefined;
    }, [routeParams]);

    const searchParams = useMemo(() => {
        return routeSearchParams ? mapSearchParams(routeSearchParams) : undefined;
    }, [routeSearchParams]);

    if (!params && !searchParams) {
        return null;
    }

    return {
        params,
        searchParams,
    };
};
