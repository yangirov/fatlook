import { FC, useEffect, useState } from 'react';

import { Button } from '@/shared/ui';
import { User } from '@/shared/types';

import styles from './UserForm.module.css';

const getUserId = (url: string) => {
    const regex = /\/export\/(\d+)\//;
    const match = regex.exec(url);
    return match ? match[1] : '';
};

type UserFormProps = {
    data: User | null;
    onSubmit: (payload: User) => void;
    onCancelUpdate: () => void;
};

export const UserForm: FC<UserFormProps> = ({ data, onSubmit, onCancelUpdate }) => {
    const [name, setName] = useState('');
    const [reportUrl, setReportUrl] = useState('');
    const [dailyAmount, setDailyAmount] = useState('');

    useEffect(() => {
        if (data) {
            setName(data.name);
            setReportUrl(data.report);
            data.dailyAmount && setDailyAmount(data.dailyAmount);
        }
    }, [data]);

    const clearForm = () => {
        setName('');
        setReportUrl('');
        setDailyAmount('');
    };

    const handleUser = () => {
        onSubmit({
            name,
            report: data ? reportUrl : getUserId(reportUrl),
            dailyAmount
        });

        clearForm();
    };

    const actionText = data ? 'Обновить' : 'Добавить';

    return (
        <div className={styles.container}>
            <h3>{actionText}</h3>

            <form className={styles.inputs} autoComplete="off">
                <input className={styles.input} type="text" placeholder="Имя" name="name" required value={name} onChange={e => setName(e.target.value)} />

                <input
                    className={styles.input}
                    type="url"
                    placeholder="Ссылка на отчет FatSecret"
                    name="url"
                    required
                    disabled={data !== null}
                    value={reportUrl}
                    onChange={e => setReportUrl(e.target.value)}
                />

                <input
                    className={styles.input}
                    type="number"
                    placeholder="Цель по калориям (РСК)"
                    name="dailyAmount"
                    value={dailyAmount}
                    onChange={e => setDailyAmount(e.target.value)}
                />
            </form>

            <div className={styles.buttons}>
                <Button onClick={handleUser}>{actionText}</Button>
                {data && (
                    <Button
                        onClick={() => {
                            clearForm();
                            onCancelUpdate();
                        }}
                    >
                        Отмена
                    </Button>
                )}
            </div>
        </div>
    );
};
