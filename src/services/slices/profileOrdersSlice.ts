import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type ProfileState = {
  orders: TOrder[];
};

const initialState: ProfileState = {
  orders: []
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrder/fetchOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    selectProfileOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const { selectProfileOrders } = profileOrdersSlice.selectors;
export default profileOrdersSlice.reducer;
