'use client';
import { FC, createContext, useContext, useState } from 'react';

import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

import styles from './SnackBar.module.scss';

type SnackBarContextProps = {
    isVisible: boolean;
    message?: string;
    show: (message: string, delay?: number) => void;
    close: () => void;
};

export const SnackBarContext = createContext<SnackBarContextProps>({} as SnackBarContextProps);

export const SnackBar: FC = () => {
    const snackBarContext = useContext(SnackBarContext);

    return createPortal(
        <div className={styles.snackBar}>
            <div className={styles.snackBarInner}>
                <div>{snackBarContext.message}</div>
                <div className={styles.snackBarClose} onClick={snackBarContext.close}>
                    <MdClose />
                </div>
            </div>
        </div>,
        document.body
    );
};

export const SnackBarContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    let timer: NodeJS.Timeout;

    const onClose = () => {
        clearTimeout(timer);
        setIsVisible(false);
    };

    const onShow = (message: string, delay = 3000) => {
        setMessage(message);
        setIsVisible(true);

        timer = setTimeout(() => {
            onClose();
        }, delay);
    };

    return (
        <SnackBarContext.Provider
            value={{
                message,
                isVisible,
                show: onShow,
                close: onClose,
            }}
        >
            {children}
        </SnackBarContext.Provider>
    );
};
