'use client';
import { FC, useState } from 'react';

import Link from 'next/link';
import { SlPencil, SlTrash } from 'react-icons/sl';

import { User } from '@fatlook/core/types';

import { formatDate } from '@fatlook/core/utils';

import { PageLayout } from '@/web/shared/layouts';
import { useAppSelector, useAppDispatch } from '@/web/shared/store';
import { deleteUser } from '@/web/shared/store/usersReducer';
import { Button, IconButton } from '@/web/shared/ui';

import { UserForm } from './entities/UserForm';

import styles from './Settings.module.scss';

const INSTRUCTIONS_LINK = process.env.NEXT_PUBLIC_FAT_SECRET_INSTRUCTIONS ?? null;

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

    const getReportLink = (id: string) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const date = formatDate(yesterday);

        return `/report/${id}?date=${date}`;
    };

    return (
        <PageLayout>
            <PageLayout.Header>Отчеты</PageLayout.Header>

            <PageLayout.Content>
                {users.length === 0 && <div>Нет клиентов. Добавим?</div>}

                <div className={styles.users}>
                    {users?.map(({ id, name, dailyAmount }) => (
                        <div key={name + id} className={styles.userItem}>
                            <Link className={styles.userItemLink} href={getReportLink(id)}>
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

                {INSTRUCTIONS_LINK && (
                    <Link
                        className={styles.instructionsLink}
                        href={INSTRUCTIONS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Как получить ссылку на отчет FatSecret
                    </Link>
                )}

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
