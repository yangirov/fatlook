'use client';

import { FC, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/store';
import { SnackBarContextProvider } from '@/shared/ui/';

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <Provider store={store}>
                <SnackBarContextProvider>{children}</SnackBarContextProvider>
            </Provider>
        );
    }
};

export default Providers;
