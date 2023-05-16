'use client';

import { Error } from '@/features/Error';

export default function CustomError({ error }: { error: Error }) {
    return <Error error={error} />;
}
