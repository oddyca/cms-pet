import { configureStore } from '@reduxjs/toolkit';
import dashboardCategoryFilter from './slices/categorySelectionSlice';
import postEditSlice from './slices/postEditSlice';
import updateImageSlice from './slices/updateImageSlice';

export const store = configureStore({
  reducer: {
    dashboardCategoryFilter: dashboardCategoryFilter,
    postEditSlice: postEditSlice,
    updateImageSlice: updateImageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
