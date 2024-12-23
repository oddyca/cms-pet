import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  value: string;
}

const initialState: FilterState = {
  value: '',
};

export const categorySelectionSlice = createSlice({
  name: 'dashboardCategoryFilter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
    resetCategory: () => initialState,
  },
});

export const { setCategory, resetCategory } = categorySelectionSlice.actions;

export default categorySelectionSlice.reducer;
