import React, { FC, useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { User } from '@fatlook/core/types';
import { getUserId, isEqual, isNumeric } from '@fatlook/core/utils';

import { useAppDispatch } from '@/web/shared/store';
import { addUser, updateUser } from '@/web/shared/store/usersReducer';
import { Button, Input, Modal } from '@/web/shared/ui';

import styles from './UserForm.module.css';

type UserFormProps = {
    isOpen: boolean;
    user: User | null;
    onClearUser: () => void;
    onToggle: () => void;
};

type UserFormData = {
    name: string;
    id: string;
    dailyAmount?: string;
    weightGoal?: string;
    stepsGoal?: string;
};

export const UserForm: FC<UserFormProps> = ({ isOpen, user, onToggle, onClearUser }) => {
    const {
        control,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<UserFormData>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            const { name, id, dailyAmount, stepsGoal, weightGoal } = user;

            setValue('name', name);
            setValue('id', id);

            dailyAmount && setValue('dailyAmount', dailyAmount.toString());
            stepsGoal && setValue('stepsGoal', stepsGoal.toString());
            weightGoal && setValue('weightGoal', weightGoal.toString());
        }
    }, [user, setValue]);

    const clearForm = () => {
        reset();
        onClearUser();
    };

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        const payload = getValues() as User;

        const dto = Object.entries(payload).reduce((acc, [key, value]) => {
            if (key === 'id') {
                acc = { ...acc, [key]: user ? user.id : getUserId(payload.id) || '' };
            } else if (isNumeric(value)) {
                acc = { ...acc, [key]: Number(value) };
            } else {
                acc = { ...acc, [key]: value };
            }

            return acc;
        }, {} as User);

        if (user !== null) {
            dispatch(updateUser(dto));
        } else {
            dispatch(addUser(dto));
        }

        clearForm();
        onToggle();
    };

    const hasNoChanges = () => {
        const mappedUser = user
            ? Object.entries(user).reduce((acc, [key, value]) => {
                  acc = { ...acc, [key]: typeof value === 'number' ? value.toString() : value };
                  return acc;
              }, {})
            : null;

        const formUser = getValues();

        if (!mappedUser && Object.values(formUser).every(value => !value)) {
            return true;
        }

        const filteredFormUser = Object.entries(formUser).reduce((acc, [key, value]) => {
            if (value !== undefined) acc = { ...acc, [key]: value };
            return acc;
        }, {});

        return isEqual(mappedUser, filteredFormUser);
    };

    const onModalToggle = () => {
        if (hasNoChanges()) {
            clearForm();
            onToggle();
        } else {
            const actionText = user ? 'обновления' : 'добавления';
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
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <Input type="text" placeholder="Имя" {...field} />}
                    />
                    {errors.name && <span className={styles.error}>Это обязательное поле</span>}

                    <Controller
                        name="id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                placeholder="Ссылка на отчет FatSecret"
                                type="url"
                                disabled={user !== null}
                                {...field}
                            />
                        )}
                    />
                    {errors.id && <span className={styles.error}>Это обязательное поле</span>}

                    <Controller
                        name="dailyAmount"
                        control={control}
                        rules={{ pattern: /[^0-9]/g }}
                        render={({ field }) => <Input placeholder="Цель по калориям (РСК)" type="number" {...field} />}
                    />
                    {errors.dailyAmount && <span className={styles.error}>Только цифры</span>}

                    <Controller
                        name="weightGoal"
                        control={control}
                        rules={{ pattern: /[^0-9]/g }}
                        render={({ field }) => <Input placeholder="Цель по весу" type="number" step="1" {...field} />}
                    />
                    {errors.weightGoal && <span className={styles.error}>Только цифры</span>}

                    <Controller
                        name="stepsGoal"
                        control={control}
                        rules={{ pattern: /[^0-9]/g }}
                        render={({ field }) => <Input placeholder="Цель по шагам" type="number" step="1" {...field} />}
                    />
                    {errors.stepsGoal && <span className={styles.error}>Только цифры</span>}

                    <div className={styles.buttons}>
                        <Button type="submit" onClick={e => onSubmit(e)}>
                            {actionText}
                        </Button>
                    </div>
                </form>
            </Modal.Content>
        </Modal>
    );
};
