import { combineSlices } from '@reduxjs/toolkit';
import ingredientsSlice, {
  initialState as ingredientsInitialState
} from './slices/ingredientsSlice';
import constructorSlice, {
  initialState as burgerInitialState
} from './slices/burgerConstructorSlice';
import userSlice, {
  initialState as userInitialState
} from './slices/userSlice';
import feedSlice, {
  initialState as feedInitialState
} from './slices/feedSlice';
import orderSlice, {
  initialState as orderInitialState
} from './slices/orderSlice';
import profileOrdersSlice, {
  initialState as profileOrdersInitialState
} from './slices/profileOrdersSlice';

const testRootReducer = combineSlices({
  burgerConstructor: constructorSlice,
  ingredients: ingredientsSlice,
  user: userSlice,
  feed: feedSlice,
  order: orderSlice,
  profileOrders: profileOrdersSlice
});

describe('rootReducer', () => {
  it('Правильная инициализация rootReducer', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const resultState = testRootReducer(undefined, unknownAction);

    const expectedInitialState = {
      burgerConstructor: burgerInitialState,
      ingredients: ingredientsInitialState,
      user: userInitialState,
      feed: feedInitialState,
      order: orderInitialState,
      profileOrders: profileOrdersInitialState
    };

    expect(resultState).toEqual(expectedInitialState);
  });
});
