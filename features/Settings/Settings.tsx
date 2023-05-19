'use client';
import { FC, useState } from 'react';

import Link from 'next/link';
import { SlPencil, SlTrash } from 'react-icons/sl';

import { PageLayout } from '@/shared/layouts';
import { useAppSelector, useAppDispatch } from '@/shared/store';
import { deleteUser } from '@/shared/store/usersReducer';
import { User } from '@/shared/types';
import { Button, IconButton } from '@/shared/ui';

import { UserForm } from './entities/UserForm';

import styles from './Settings.module.scss';

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
        const confirmDialog = confirm(`Удалить пользователя ${name}?`);
        if (confirmDialog) {
            dispatch(deleteUser(userId));
            setUser(null);
        }
    };

    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>

            <PageLayout.Content>
                {users.length === 0 && <div>Нет клиентов. Добавим?</div>}

                <div className={styles.users}>
                    {users?.map(({ id, name, dailyAmount }) => (
                        <div key={name + id} className={styles.userItem}>
                            <Link className={styles.userItemLink} href={`/report/${id}`}>
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

                <Button onClick={onToggleUserForm}>Добавить клиента</Button>

                <UserForm
                    user={user}
                    onClearUser={() => setUser(null)}
                    isOpen={isOpenUserForm}
                    onToggle={onToggleUserForm}
                />
            </PageLayout.Content>
        </PageLayout>
    );
};
