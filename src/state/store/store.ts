import { configureStore } from '@reduxjs/toolkit';
import dashboardCategoryFilter from './slices/dashboardFilterSlice';
import postEditSlice from './slices/postEditSlice';

export const store = configureStore({
  reducer: {
    dashboardCategoryFilter: dashboardCategoryFilter,
    postEditSlice: postEditSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
