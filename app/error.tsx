'use client';
import React from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    <>
        <p>Ошибка приложения 🙁</p>
        {error && <p>{error.message}</p>}
    </>;
}
