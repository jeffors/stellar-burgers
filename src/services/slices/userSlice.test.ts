import reducer, {
  fetchUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';

const user = {
  success: true,
  user: { email: 'test@test.ru', name: 'test' }
};

describe('Тестирование входа пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: user
    });
    expect(state.user).toEqual(user.user);
    expect(state.isAuthChecked).toBe(true);
  });
});
describe('Тестирование регистрации пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: user
    });
    expect(state.user).toEqual(user.user);
    expect(state.isAuthChecked).toBe(true);
  });
});
describe('Тестирование логаута пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: logoutUser.fulfilled.type,
      payload: user
    });
    expect(state.user).toBeNull;
  });
});
describe('Тестирование фетча пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: fetchUser.fulfilled.type,
      payload: user
    });
    expect(state.user).toEqual(user.user);
    expect(state.isAuthChecked).toBe(true);
  });
  it('Экшен ошибки запроса (rejected)', () => {
    const state = reducer(initialState, {
      type: fetchUser.rejected.type
    });
    expect(state.isAuthChecked).toBe(true);
  });
});
describe('Тестирование обновления пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: user
    });
    expect(state.user).toEqual(user.user);
    expect(state.updateUserError).toBeUndefined();
  });
  it('Экшен ошибки запроса (rejected)', () => {
    const errorMessage = 'Ошибка обновления пользователя'
    const state = reducer(initialState, {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    });
    expect(state.updateUserError).toBe(errorMessage);
  });
});
