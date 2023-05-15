import { FC } from 'react';

import styles from './EmptyContent.module.scss';

type EmptyContentProps = {
    children?: React.ReactNode;
};

export const EmptyContent: FC<EmptyContentProps> = ({ children }) => <div className={styles.emptyContent}>{children ? children : 'Ничего не найдено 🙄'}</div>;
