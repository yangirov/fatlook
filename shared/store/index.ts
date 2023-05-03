'use client';
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { FATLOOK_STATE } from '../consts';
import { User } from '../types';

import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    users: usersReducer
});

const localStorageMiddleware: Middleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem(FATLOOK_STATE, JSON.stringify(getState()));
        return result;
    };
};

const reHydrateStore = () => {
    // TODO: Remove after migration
    if (localStorage.getItem('FATLOOK_USERS')) {
        const state = { users: { users: JSON.parse(localStorage.getItem('FATLOOK_USERS') ?? '[]') as User[] } };
        localStorage.setItem(FATLOOK_STATE, JSON.stringify(state));
        localStorage.removeItem('FATLOOK_USERS');
    }

    if (localStorage.getItem(FATLOOK_STATE)) {
        return JSON.parse(localStorage.getItem(FATLOOK_STATE) ?? '');
    }
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
