import { FC, ReactNode, useContext } from 'react';

import classNames from 'classnames';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';

import { UserSelector } from '@/web/entities/UserSelector';

import { useWebViewStatus } from '../../hooks';
import { SnackBar, SnackBarContext } from '../../ui';

import styles from './PageLayout.module.scss';

type PageLayoutProps = {
    children: ReactNode;
    onBack?: () => void;
};

export const PageLayoutWrapper: FC<PageLayoutProps> = ({ children }) => {
    return <div className={styles.pageContainer}>{children}</div>;
};

const PageLayoutHeader: FC<PageLayoutProps> = ({ children, onBack }) => {
    const isWebView = useWebViewStatus();

    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const isHomePage = pathname === '/';
    const isReportPage = pathname?.includes('/report');
    const isStatsPage = pathname?.includes('/stats');

    const onBackArrowClick = () => {
        if (onBack) {
            onBack();
        } else {
            switch (true) {
                case isReportPage:
                    router.push('/');
                    break;
                case isStatsPage:
                    router.push(`/report/${params?.userId}`);
                    break;
                default:
                    router.back();
                    break;
            }
        }
    };

    if (isWebView) {
        return null;
    }

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
    const isWebView = useWebViewStatus();
    const snackBarContext = useContext(SnackBarContext);

    return (
        <div className={classNames(styles.pageContent, { [styles.pageContentWebView]: isWebView })}>
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
