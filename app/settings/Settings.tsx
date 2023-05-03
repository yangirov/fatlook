'use client';
import { FC } from 'react';

import Link from 'next/link';

import { Divider, IconButton } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { PageLayout } from '@/shared/layouts';
import { useAppSelector, useAppDispatch } from '@/shared/store';

import { AddUserForm } from './components/AddUserForm';

import styles from './Settings.module.scss';
import { addUser, deleteUser } from '@/shared/store/usersReducer';
import { SlTrash } from 'react-icons/sl';

const getReport = (userId: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `/report/${userId}?date=${formatDate(yesterday)}`;
};

export const Settings: FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.users);

    const onAddUser = (name: string, report: string) => {
        dispatch(addUser({ name, report }));
    };

    const onDeleteUser = (name: string, reportId: string) => {
        const conf = confirm(`Удалить пользователя ${name}?`);
        if (conf) {
            dispatch(deleteUser(reportId));
        }
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
                            <div key={report} className={styles.userItem}>
                                <Link className={styles.userItemLink} href={getReport(report)}>
                                    {name}
                                </Link>
                                <IconButton className={styles.userItemDelete} onClick={() => onDeleteUser(name, report)}>
                                    <SlTrash />
                                </IconButton>
                            </div>
                        ))
                    )}
                </div>

                <Divider />
                <AddUserForm onAddUser={onAddUser} />
            </PageLayout.Content>
        </PageLayout>
    );
};
