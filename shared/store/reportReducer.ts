'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FoodDetails, PartialFoodDetailsKeys } from '../types';

export interface ReportState {
    visibleColumns: PartialFoodDetailsKeys;
}

const initialState: ReportState = {
    visibleColumns: ['protein', 'allFat', 'fiber', 'carbohydrates']
};

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        changeColumns: (state, action: PayloadAction<Partial<keyof FoodDetails>>) => {
            const filteredColumns = state.visibleColumns.filter(k => k !== action.payload);

            if (state.visibleColumns.includes(action.payload)) {
                state.visibleColumns = filteredColumns;
            } else {
                state.visibleColumns = [...filteredColumns, action.payload];
            }
        }
    }
});

export const { changeColumns } = reportSlice.actions;
export default reportSlice.reducer;
