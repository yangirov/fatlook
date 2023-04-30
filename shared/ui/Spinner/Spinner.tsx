import { FC } from 'react';
import classNames from 'classnames';

import styles from './Spinner.module.scss';

type SpinnerProps = {
    className?: string;
    wrapped?: boolean;
};

export const Spinner: FC<SpinnerProps> = ({ className, wrapped }) => {
    return (
        <div
            className={classNames({
                [styles.spinnerWrapper]: wrapped === true
            })}
        >
            <div className={classNames(styles.spinner, className)} />
        </div>
    );
};
