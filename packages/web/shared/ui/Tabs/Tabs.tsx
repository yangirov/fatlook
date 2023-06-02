'use client';
import { FC, ReactNode, ReactElement, useEffect, useState } from 'react';

import classNames from 'classnames';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './Tabs.module.scss';

type TabProps = { title: string; children: ReactNode };

export const Tab: FC<TabProps> = ({ children }) => {
    return <div>{children}</div>;
};

type TabsProps = {
    className?: string;
    children: ReactElement<TabProps>[];
};

const QUERY_PARAM_TAB = 'tab';

export const Tabs: FC<TabsProps> = ({ className, children }) => {
    const [selected, setSelected] = useState(0);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams() as unknown as URLSearchParams;

    useEffect(() => {
        if (searchParams?.get(QUERY_PARAM_TAB)) {
            const tabIndex = Number(searchParams?.get(QUERY_PARAM_TAB));
            setSelected(tabIndex);
        }
    }, [searchParams]);

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);

        return params.toString();
    };

    const selectTab = (index: number) => {
        router.push(pathname + '?' + createQueryString(QUERY_PARAM_TAB, `${index}`));
    };

    return (
        <>
            <nav className={classNames(styles.tabs, className)}>
                {children.map((tab, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames(styles.tabsItem, { [styles.tabsItemSelected]: index === selected })}
                            onClick={() => selectTab(index)}
                        >
                            <span>{tab.props.title}</span>
                        </div>
                    );
                })}
            </nav>
            <div className={styles.tabsContent}>{children[selected]}</div>
        </>
    );
};
