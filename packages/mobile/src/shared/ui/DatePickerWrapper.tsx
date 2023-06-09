import { FC, useState } from 'react';

import DatePicker from 'react-native-date-picker';

type DatePickerWrapperProps = {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    visible: boolean;
    onToggle: () => void;
    onConfirm: (date: Date) => void;
    onCancel?: () => void;
    mode?: 'date' | 'time' | 'datetime';
};

export const DatePickerWrapper: FC<DatePickerWrapperProps> = ({
    onToggle,
    onConfirm,
    onCancel,
    visible,
    title,
    confirmText,
    cancelText,
    mode,
}) => {
    const [date, setDate] = useState(new Date());

    const onConfirmHandle = (date: Date) => {
        setDate(date);
        onToggle();
        onConfirm(date);
    };

    const onCancelHandle = () => {
        onToggle();
        onCancel && onCancel();
    };

    if (!visible) {
        return null;
    }

    return (
        <DatePicker
            modal
            mode={mode ?? 'date'}
            locale="ru"
            title={title ?? 'Выберите дату'}
            confirmText={confirmText ?? 'Выбрать'}
            cancelText={cancelText ?? 'Отменить'}
            open={visible}
            date={date}
            onConfirm={onConfirmHandle}
            onCancel={onCancelHandle}
            androidVariant="nativeAndroid"
        />
    );
};
