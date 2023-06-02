import { FC, useEffect, useState } from 'react';

import { User } from '@fatlook/core/types';
import { getUserId, isEqual } from '@fatlook/core/utils';

import { useAppDispatch } from '@/web/shared/store';
import { addUser, updateUser } from '@/web/shared/store/usersReducer';
import { Button, Modal } from '@/web/shared/ui';

import styles from './UserForm.module.css';

type UserFormProps = {
    isOpen: boolean;
    user: User | null;
    onClearUser: () => void;
    onToggle: () => void;
};

export const UserForm: FC<UserFormProps> = ({ isOpen, user, onToggle, onClearUser }) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [reportUrl, setReportUrl] = useState('');
    const [dailyAmount, setDailyAmount] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setReportUrl(user.id);
            user.dailyAmount && setDailyAmount(user.dailyAmount);
        }
    }, [user]);

    const clearForm = () => {
        setName('');
        setReportUrl('');
        setDailyAmount(undefined);

        onClearUser();
    };

    const handleUser = () => {
        const dto = {
            id: user ? reportUrl : getUserId(reportUrl) || '',
            name,
            dailyAmount,
        };

        if (user !== null) {
            dispatch(updateUser(dto));
        } else {
            dispatch(addUser(dto));
        }

        clearForm();
        onToggle();
    };

    const hasNoChanges = () => {
        const a = user ?? { id: '', name: '', dailyAmount: '' };
        const b = { id: reportUrl, name, dailyAmount };

        return isEqual(a, b);
    };

    const onModalToggle = () => {
        const actionText = user ? 'обновления' : 'добавления';

        if (hasNoChanges()) {
            clearForm();
            onToggle();
        } else {
            const conf = confirm(`Есть несохраненные изменения. Закрыть окно ${actionText}?`);
            if (conf) {
                clearForm();
                onToggle();
            }
        }
    };

    const actionText = user ? 'Обновить' : 'Добавить';

    return (
        <Modal isOpen={isOpen} onToggle={onModalToggle}>
            <Modal.Title>{actionText} клиента</Modal.Title>

            <Modal.Content>
                <form className={styles.inputs} autoComplete="off">
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Имя"
                        name="name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        className={styles.input}
                        type="url"
                        placeholder="Ссылка на отчет FatSecret"
                        name="url"
                        required
                        disabled={user !== null}
                        value={reportUrl}
                        onChange={e => setReportUrl(e.target.value)}
                    />

                    <input
                        className={styles.input}
                        type="number"
                        placeholder="Цель по калориям (РСК)"
                        name="dailyAmount"
                        value={dailyAmount}
                        onChange={e => setDailyAmount(+e.target.value)}
                    />
                </form>

                <div className={styles.buttons}>
                    <Button onClick={handleUser} disabled={hasNoChanges()}>
                        {actionText}
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};
