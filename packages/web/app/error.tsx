'use client';

import { Error } from '@/web/features/Error';

export default function CustomError({ error }: { error: Error }) {
    return <Error error={error} />;
}
