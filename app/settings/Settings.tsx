'use client';
import { FC, useState } from 'react';
import { SlPencil, SlTrash } from 'react-icons/sl';
import Link from 'next/link';

import { Button, IconButton } from '@/shared/ui';
import { formatDate } from '@/shared/utils';
import { PageLayout } from '@/shared/layouts';
import { useAppSelector, useAppDispatch } from '@/shared/store';
import { User } from '@/shared/types';
import { deleteUser } from '@/shared/store/usersReducer';

import { UserForm } from './components/AddUserForm';

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
    const [isOpenUserForm, setIsOpenUserForm] = useState(false);

    const onToggleUserForm = () => {
        setIsOpenUserForm(prev => !prev);
    };

    const onUpdateUser = (user: User) => {
        setUser(user);
        onToggleUserForm();
    };

    const onDeleteUser = (userId: string, name: string) => {
        const conf = confirm(`Удалить пользователя ${name}?`);
        if (conf) {
            dispatch(deleteUser(userId));
            setUser(null);
        }
    };

    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>

            <PageLayout.Content>
                {users.length === 0 && <div>Нет подопечных</div>}

                <div className={styles.users}>
                    {users?.map(({ id, name, dailyAmount }) => (
                        <div key={name + id} className={styles.userItem}>
                            <Link className={styles.userItemLink} href={getReport(id)}>
                                {name}
                            </Link>
                            <div className={styles.userItemButtons}>
                                <IconButton onClick={() => onUpdateUser({ id, name, dailyAmount })}>
                                    <SlPencil />
                                </IconButton>
                                <IconButton onClick={() => onDeleteUser(id, name)}>
                                    <SlTrash />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>

                <Button onClick={onToggleUserForm}>Добавить</Button>

                <UserForm user={user} onClearUser={() => setUser(null)} isOpen={isOpenUserForm} onToggle={onToggleUserForm} />
            </PageLayout.Content>
        </PageLayout>
    );
};
