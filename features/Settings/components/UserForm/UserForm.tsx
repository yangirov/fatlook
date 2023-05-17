import { FC, useEffect, useState } from 'react';

import { Button, Modal } from '@/shared/ui';
import { User } from '@/shared/types';
import { useAppDispatch } from '@/shared/store';
import { addUser, updateUser } from '@/shared/store/usersReducer';
import { isEqual } from '@/shared/utils';

import styles from './UserForm.module.css';

const getUserId = (url: string) => {
    const regex = /\/export\/(\d+)\//;
    const match = regex.exec(url);
    return match ? match[1] : '';
};

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
            name,
            id: user ? reportUrl : getUserId(reportUrl),
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
            <div className={styles.reportSettings}>
                <h3>{actionText}</h3>

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
            </div>
        </Modal>
    );
};
