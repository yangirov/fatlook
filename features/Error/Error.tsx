import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { EmptyContent } from '@/shared/ui';

import styles from './Error.module.scss';

export type ErrorProps = {
    error?: Error;
};

export const Error: FC<ErrorProps> = ({ error }) => {
    const router = useRouter();

    return (
        <EmptyContent>
            <div className={styles.error}>
                <div className={styles.errorTitle}>Ошибка приложения 🙁</div>
                <div className={styles.errorText}>{error?.message}</div>

                <Link
                    className={styles.errorLink}
                    onClick={e => {
                        e.preventDefault();
                        router.back();
                    }}
                    href=""
                >
                    Назад
                </Link>
            </div>
        </EmptyContent>
    );
};
