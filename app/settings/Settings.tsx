'use client';
import { FC } from 'react';

import Link from 'next/link';

import { Divider } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { PageLayout } from '@/shared/layouts';
import { useAppSelector, useAppDispatch } from '@/shared/store';

import { AddUserForm } from './components/AddUserForm';

import styles from './Settings.module.scss';
import { addUser } from '@/shared/store/usersReducer';

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

    // const onClear = () => {
    //     dispatch(clearUsers());
    // };

    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>

            <PageLayout.Content>
                <div className={styles.users}>
                    {!users || users.length === 0 ? (
                        <div>Нет подопечных</div>
                    ) : (
                        users.map(({ report, name }) => (
                            <Link className={styles.userItem} key={report} href={getReport(report)}>
                                {name}
                            </Link>
                        ))
                    )}
                </div>

                <Divider />
                <AddUserForm onAddUser={onAddUser} />
                {/* <Button onClick={onClear}>Очистить</Button> */}
            </PageLayout.Content>
        </PageLayout>
    );
};
