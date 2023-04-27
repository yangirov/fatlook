import { FC } from 'react';
import styles from './ErrorPage.module.scss';

export interface ErrorPageProps {
    error?: Error;
    reset: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
    return (
        <div className={styles.errorPage}>
            <p>Ошибка приложения 🙁</p>
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default ErrorPage;
