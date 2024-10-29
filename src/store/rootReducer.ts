import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  auth,
  garage,
  category,
  analytics,
  brandListFilter,
  contact,
} from '@slices';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
  auth,
  garage,
  category,
  analytics,
  brandListFilter,
  contact,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
