import {configureStore} from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import {persistStore} from 'redux-persist';
import {persistedReducer} from './rootReducer';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useSelector = useAppSelector;
export const useDispatch: () => dispatch = useAppDispatch;
