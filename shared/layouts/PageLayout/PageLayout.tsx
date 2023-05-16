import React, { FC, useContext } from 'react';
import classNames from 'classnames';

import { SnackBar, SnackBarContext } from '../../ui';

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

const PageLayoutContent: FC<PageLayoutProps> = ({ children }) => {
    const snackBarContext = useContext(SnackBarContext);

    return (
        <div className={styles.pageContent}>
            {children}
            {snackBarContext.isVisible && <SnackBar />}
        </div>
    );
};

const PageLayoutComposition = {
    Header: PageLayoutHeader,
    Content: PageLayoutContent
};

export const PageLayout = Object.assign(PageLayoutWrapper, PageLayoutComposition);
