'use client';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { Divider } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { PageLayout } from '@/shared/layouts';
import { FATLOOK_USERS } from '@/shared/consts';

import { AddUserForm } from './components/AddUserForm';

import styles from './Settings.module.scss';

const getReport = (name: string, userId: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `/report/${userId}?date=${formatDate(yesterday)}&name=${name}`;
};

export type UserReport = {
    report: string;
    name: string;
    dailyAmount?: number;
};

export const Settings: FC = () => {
    const [users, setUsers] = useState<UserReport[]>();

    useEffect(() => {
        const value = localStorage.getItem(FATLOOK_USERS);
        if (value) {
            const users = JSON.parse(value);
            setUsers(users as UserReport[]);
        }
    }, []);

    const onAddUser = (name: string, report: string) => {
        setUsers(prev => {
            const arr = [];
            if (prev) {
                arr.push(...prev);
            }

            arr.push({ name, report });
            localStorage.setItem(FATLOOK_USERS, JSON.stringify(arr));

            return arr;
        });
    };

    const onClear = () => {
        localStorage.setItem(FATLOOK_USERS, '');
        setUsers([]);
    };

    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>

            <PageLayout.Content>
                <div className={styles.users}>
                    {!users || users.length === 0 ? (
                        <div>Нет подопечных</div>
                    ) : (
                        users.map(({ report, name }) => (
                            <Link className={styles.userItem} key={report} href={getReport(name, report)}>
                                {name}
                            </Link>
                        ))
                    )}
                </div>
                {/* <Button onClick={onClear}>Очистить</Button> */}
                <Divider />
                <AddUserForm onAddUser={onAddUser} />
            </PageLayout.Content>
        </PageLayout>
    );
};
