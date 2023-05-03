import React, { FC } from 'react';

import classNames from 'classnames';

import styles from './PageLayout.module.scss';

type PageLayoutProps = {
    children: React.ReactNode;
};

export const PageLayoutWrapper: FC<PageLayoutProps> = ({ children }) => {
    return <div className={styles.pageContainer}>{children}</div>;
};

const PageLayoutHeader: FC<PageLayoutProps> = ({ children }) => {
    return <header className={classNames(styles.pageHeader)}>{children}</header>;
};

const PageLayoutContent: FC<PageLayoutProps> = ({ children }) => <div className={styles.pageContent}>{children}</div>;

const PageLayoutComposition = {
    Header: PageLayoutHeader,
    Content: PageLayoutContent
};

export const PageLayout = Object.assign(PageLayoutWrapper, PageLayoutComposition);
