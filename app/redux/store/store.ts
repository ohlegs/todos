import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../reducers/initState';

export const store = configureStore({
  reducer: {
    tasks: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
