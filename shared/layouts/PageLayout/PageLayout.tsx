import React, { FC, useContext } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';

import { UserSelector } from '@/entities/UserSelector';

import { SnackBar, SnackBarContext } from '../../ui';

import styles from './PageLayout.module.scss';

type PageLayoutProps = {
    children: React.ReactNode;
    onBack?: () => void;
};

export const PageLayoutWrapper: FC<PageLayoutProps> = ({ children }) => {
    return <div className={styles.pageContainer}>{children}</div>;
};

const PageLayoutHeader: FC<PageLayoutProps> = ({ children, onBack }) => {
    const pathname = usePathname();
    const router = useRouter();

    const isHomePage = pathname === '/';

    const onBackArrowClick = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <header className={styles.pageHeader}>
            <div className={styles.pageHeaderWrapper}>
                <div className={styles.pageHeaderLeft}>{!isHomePage && <MdArrowBack onClick={onBackArrowClick} />}</div>
                <div className={styles.pageHeaderCenter}>{children}</div>
                <div className={styles.pageHeaderRight}>
                    <UserSelector />
                </div>
            </div>
        </header>
    );
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
    Content: PageLayoutContent,
};

export const PageLayout = Object.assign(PageLayoutWrapper, PageLayoutComposition);
