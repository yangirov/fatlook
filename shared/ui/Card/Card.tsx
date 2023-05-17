import { FC } from 'react';
import classNames from 'classnames';

import styles from './Card.module.scss';

export type CardProps = {
    title?: string;
    children: React.ReactNode;
    extraClassNames?: {
        wrapper?: string;
        title?: string;
        content?: string;
    };
};

export const Card: FC<CardProps> = ({ children, title, extraClassNames }) => {
    return (
        <div className={classNames(styles.card, extraClassNames?.wrapper)}>
            {title && <div className={classNames(styles.cardTitle, extraClassNames?.title)}>{title}</div>}
            <div className={classNames(styles.cardContent, extraClassNames?.content)}>{children}</div>
        </div>
    );
};
