import { FC } from 'react';

import Image from 'next/image';

import { Button, EmptyContent } from '@/web/shared/ui';

import styles from './NotFound.module.scss';

export const NotFound: FC = () => {
    return (
        <EmptyContent>
            <div className={styles.notFound}>
                <div className={styles.notFoundTitle}>404</div>
                <div className={styles.notFoundText}>Страница не найдена</div>

                <Button href="/">На главную</Button>

                <Image className={styles.notFoundImage} src="images/404.svg" alt="404" width={250} height={250} />
            </div>
        </EmptyContent>
    );
};
