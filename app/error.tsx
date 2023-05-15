'use client';

export default function Error({ error }: { error: Error }) {
    return (
        <>
            <p>Ошибка приложения 🙁</p>
            {error && <p>{error.message}</p>}
        </>
    );
}
