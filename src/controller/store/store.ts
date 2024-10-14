import { configureStore } from '@reduxjs/toolkit';
import dashboardCategoryFilter from './slices/dashboardFilterSlice';

export const store = configureStore({
  reducer: {
    dashboardCategoryFilter: dashboardCategoryFilter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
