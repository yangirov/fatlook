import { FC } from 'react';
import classnames from 'classnames';

import styles from './Spinner.module.scss';

type SpinnerProps = {
    className?: string;
};

export const Spinner: FC<SpinnerProps> = ({ className }) => {
    return <div className={classnames(styles.spinner, className)} />;
};
