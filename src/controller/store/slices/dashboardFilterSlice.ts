import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  value: string;
}

const initialState: FilterState = {
  value: 'All Categories',
};

export const counterSlice = createSlice({
  name: 'dashboardCategoryFilter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
    resetCategory: () => initialState,
  },
});

export const { setCategory, resetCategory } = counterSlice.actions;

export default counterSlice.reducer;
