import { FC, useState } from 'react';

import { Button } from '@/shared/ui';

import styles from './AddUserForm.module.css';

const getReportId = (url: string) => {
    const regex = /\/export\/(\d+)\//;
    const match = regex.exec(url);
    return match ? match[1] : '';
};

type AddUserFormProps = {
    onAddUser: (name: string, report: string) => void;
    onClear: () => void;
};

export const AddUserForm: FC<AddUserFormProps> = ({ onAddUser, onClear }) => {
    const [name, setName] = useState('');
    const [report, setReport] = useState('');

    const handleAddUser = () => {
        onAddUser(name, getReportId(report));
        setName('');
        setReport('');
    };

    return (
        <div className={styles.container}>
            <h3>Добавить</h3>

            <div className={styles.inputs}>
                <input className={styles.input} type="text" placeholder="Имя" name="name" required value={name} onChange={e => setName(e.target.value)} />
                <input className={styles.input} type="еуч" placeholder="Ссылка на отчет FatSecret" name="url" required value={report} onChange={e => setReport(e.target.value)} />
            </div>

            <div className={styles.buttons}>
                <Button onClick={handleAddUser}>Добавить</Button>
                <Button onClick={onClear}>Очистить</Button>
            </div>
        </div>
    );
};
