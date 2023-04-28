'use client';
import React from 'react';

import ErrorPage from '@/pages/error';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return <ErrorPage error={error} reset={reset} />;
}
