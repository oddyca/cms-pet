import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  value: string;
}

const initialState: FilterState = {
  value: '',
};

export const dashboardFilterSlice = createSlice({
  name: 'dashboardCategoryFilter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
    resetCategory: () => initialState,
  },
});

export const { setCategory, resetCategory } = dashboardFilterSlice.actions;

export default dashboardFilterSlice.reducer;
