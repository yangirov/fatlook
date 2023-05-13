import { FC } from 'react';

import styles from './EmptyContent.module.scss';

type EmptyContentProps = {
    text?: string;
};

export const EmptyContent: FC<EmptyContentProps> = ({ text }) => <div className={styles.emptyContent}>{text ? text : 'Ничего не найдено 🙄'}</div>;
