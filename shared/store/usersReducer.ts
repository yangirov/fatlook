'use client';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { User } from '../types';

import { RootState } from '.';

export interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users = [...state.users, action.payload];
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return { ...action.payload, id: user.id };
                }

                return user;
            });
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(u => u.id !== action.payload);
        },
    },
});

const selectUsers = (state: RootState) => state.users.users;
const selectUserId = (state: RootState, userId: string) => userId;

export const getUserById = createSelector([selectUsers, selectUserId], (users, userId: string) =>
    users.find(u => u.id === userId)
);

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
