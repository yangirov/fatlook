import { FC } from 'react';

import styles from './Divider.module.scss';

type DividerProps = {
    index?: number;
    count?: number;
    hideFirst?: boolean;
    hideLast?: boolean;
};

export const Divider: FC<DividerProps> = ({ count, index, hideFirst, hideLast }) => {
    if (hideFirst === true && index === 0) {
        return null;
    }

    if (hideLast === true && index === count) {
        return null;
    }

    return <div className={styles.divider}></div>;
};
