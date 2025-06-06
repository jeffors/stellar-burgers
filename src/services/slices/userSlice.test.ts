import reducer, {
  fetchUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';

const userResponse = {
  success: true,
  user: { email: 'test@test.ru', name: 'test' }
};

describe('Тестирование входа пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: userResponse
    });
    expect(state.user).toEqual(userResponse.user);
    expect(state.isAuthChecked).toBe(true);
  });
});
describe('Тестирование регистрации пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: userResponse
    });
    expect(state.user).toEqual(userResponse.user);
    expect(state.isAuthChecked).toBe(true);
  });
});
describe('Тестирование логаута пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: logoutUser.fulfilled.type,
      payload: userResponse
    });
    expect(state.user).toBeNull;
  });
});
describe('Тестирование фетча пользователя', () => {
  it('Экшен успешного выполнения (fulfiled)', () => {
    const state = reducer(initialState, {
      type: fetchUser.fulfilled.type,
      payload: userResponse
    });
    expect(state.user).toEqual(userResponse.user);
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
  const updatedUser = { ...userResponse, user: { ...userResponse.user, name: 'updatedTest' } };

  it('Экшен успешного выполнения (fulfiled)', () => {
    const previousState = {
      user: userResponse.user,
      isAuthChecked: true,
      updateUserError: 'Тестовая ошибка'
    };
    const state = reducer(previousState, {
      type: updateUser.fulfilled.type,
      payload: userResponse
    });
    expect(state.user).toEqual(userResponse.user);
    expect(state.updateUserError).toBeUndefined();
    expect(state.isAuthChecked).toBe(true);
  });
  it('Экшен ошибки запроса (rejected)', () => {
    const previousState = {
      user: userResponse.user,
      isAuthChecked: true,
      updateUserError: 'Тестовая ошибка'
    };
    const errorMessage = 'Ошибка обновления пользователя';
    const state = reducer(previousState, {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    });
    expect(state.user).toEqual(userResponse.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.updateUserError).toBe(errorMessage);
  });
});
