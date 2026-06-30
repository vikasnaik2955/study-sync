import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

// Enables refetchOnFocus / refetchOnReconnect behaviour declared on the API.
setupListeners(store.dispatch);
