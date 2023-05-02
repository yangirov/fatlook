'use client';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/shared/ui';
import { formatDate } from '@/shared/utils';

import { AddUserForm } from './components/AddUserForm';

import styles from './Settings.module.scss';

const FATLOOK_USERS = 'FATLOOK_USERS';

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
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Отчеты </h2>
                <Button onClick={onClear}>Очистить</Button>
            </div>

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

            <hr />
            <AddUserForm onAddUser={onAddUser} />
        </div>
    );
};
