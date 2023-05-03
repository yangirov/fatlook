'use client';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { User } from '../types';
import { RootState } from '.';

export interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: []
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users = [...state.users, action.payload];
        },
        clearUsers: state => {
            state.users = [];
        }
    }
});

const selectUsers = (state: RootState) => state.users.users;
const selectUserId = (state: RootState, reportId: string) => reportId;
export const getUserById = createSelector([selectUsers, selectUserId], (users, reportId: string) => users.find(u => u.report === reportId));

export const { addUser, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
