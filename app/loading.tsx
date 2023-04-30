import { Spinner } from '@/shared/ui';

import styles from './styles.module.scss';

export default function Loading() {
    return (
        <div className={styles.spinnerWrapper}>
            <Spinner />
        </div>
    );
}
