import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredientsSlice';
import constructorSlice from './slices/burgerConstructorSlice';
import userSlice from './slices/userSlice';
import feedSlice from './slices/feedSlice';
import orderSlice from './slices/orderSlice';
import profileOrdersSlice from './slices/profileOrdersSlice';

const rootReducer = combineSlices({
  burgerConstructor: constructorSlice,
  ingredients: ingredientsSlice,
  user: userSlice,
  feed: feedSlice,
  order: orderSlice,
  profileOrders: profileOrdersSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
