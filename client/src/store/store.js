import { configureStore } from '@reduxjs/toolkit';
import { expenseSlice } from './reducer';
import { apiSlice } from './apiSlice';
import { getDefaultMiddleware as getDefaultReduxMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    expense: expenseSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
