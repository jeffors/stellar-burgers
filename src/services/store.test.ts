import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as burgerInitialState } from './slices/burgerConstructorSlice';
import { initialState as userInitialState } from './slices/userSlice';
import { initialState as feedInitialState } from './slices/feedSlice';
import { initialState as orderInitialState } from './slices/orderSlice';
import { initialState as profileOrdersInitialState } from './slices/profileOrdersSlice';
import { rootReducer } from './store';

describe('rootReducer', () => {
  it('Правильная инициализация rootReducer', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const resultState = rootReducer(undefined, unknownAction);

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
