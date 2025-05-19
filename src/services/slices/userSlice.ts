import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  updateUserError: string | undefined;
};

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  updateUserError: undefined
};

export const fetchUser = createAsyncThunk('/user/fetchUser', async () => {
  const response = await getUserApi();
  return response;
});

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const response = await loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const response = await registerUserApi({ email, name, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('accessToken');
  return response;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (form: Partial<TRegisterData>) => {
    const response = await updateUserApi(form);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserUpdateError: (state) => state.updateUserError
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.updateUserError = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError = action.error.message;
      });
  }
});

export const { selectUser, selectIsAuthChecked, selectUserUpdateError } =
  userSlice.selectors;
export default userSlice.reducer;
