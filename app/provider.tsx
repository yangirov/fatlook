'use client';

import { store } from '@/shared/store';
import { FC } from 'react';
import { Provider } from 'react-redux';

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default Providers;
