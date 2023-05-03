'use client';
import { FC, useState } from 'react';
import { SlPencil, SlTrash } from 'react-icons/sl';
import Link from 'next/link';

import { Divider, IconButton } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { PageLayout } from '@/shared/layouts';
import { useAppSelector, useAppDispatch } from '@/shared/store';
import { User } from '@/shared/types';
import { addUser, deleteUser, updateUser } from '@/shared/store/usersReducer';

import { UserForm } from './components/UserForm';

import styles from './Settings.module.scss';

const getReport = (userId: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `/report/${userId}?date=${formatDate(yesterday)}`;
};

export const Settings: FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.users);

    const [user, setUser] = useState<User | null>(null);

    const onSubmit = (dto: User) => {
        if (user !== null) {
            dispatch(updateUser(dto));
            setUser(null);
        } else {
            dispatch(addUser(dto));
        }
    };

    const onUpdateUser = (dto: User) => {
        setUser(dto);
    };

    const onDeleteUser = (name: string, userId: string) => {
        const conf = confirm(`Удалить пользователя ${name}?`);
        if (conf) {
            dispatch(deleteUser(userId));
            setUser(null);
        }
    };

    const onCancelUpdate = () => {
        setUser(null);
    };

    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>

            <PageLayout.Content>
                {users.length === 0 && <div>Нет подопечных</div>}

                <div className={styles.users}>
                    {users?.map(({ report, name, dailyAmount }) => (
                        <div key={name + report} className={styles.userItem}>
                            <Link className={styles.userItemLink} href={getReport(report)}>
                                {name}
                            </Link>
                            <IconButton className={styles.userItemDelete} onClick={() => onUpdateUser({ name, report, dailyAmount })}>
                                <SlPencil />
                            </IconButton>
                            <IconButton className={styles.userItemDelete} onClick={() => onDeleteUser(name, report)}>
                                <SlTrash />
                            </IconButton>
                        </div>
                    ))}
                </div>

                <Divider />

                <UserForm onSubmit={onSubmit} onCancelUpdate={onCancelUpdate} data={user} />
            </PageLayout.Content>
        </PageLayout>
    );
};
