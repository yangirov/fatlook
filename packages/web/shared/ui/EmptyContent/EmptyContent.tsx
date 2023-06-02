import { FC, ReactNode } from 'react';

import styles from './EmptyContent.module.scss';

type EmptyContentProps = {
    children?: ReactNode;
};

export const EmptyContent: FC<EmptyContentProps> = ({ children }) => (
    <div className={styles.emptyContent}>{children ?? 'Ничего не найдено 🙄'}</div>
);
