'use client';
import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './Tabs.module.scss';

type TabProps = { title: string; children: React.ReactNode };

export const Tab: FC<TabProps> = ({ children }) => {
    return <div>{children}</div>;
};

export type TabsProps = {
    navClassName?: string;
    contentClassName?: string;
    children: React.ReactElement<TabProps>[];
};

export const Tabs: FC<TabsProps> = ({ children, navClassName, contentClassName }) => {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <nav className={classNames(styles.tabs, navClassName)}>
                {children.map((tab, index) => {
                    return (
                        <div key={index} className={classNames(styles.tabsItem, { [styles.tabsItemSelected]: index === selected })} onClick={() => setSelected(index)}>
                            <span>{tab.props.title}</span>
                        </div>
                    );
                })}
            </nav>
            <div className={classNames(styles.tabsContent, contentClassName)}>{children[selected]}</div>
        </>
    );
};
