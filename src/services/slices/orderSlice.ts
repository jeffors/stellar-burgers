import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrderState = {
  order: TOrder | null;
};

const initialState: OrderState = {
  order: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number) => {
    const response = getOrderByNumberApi(number);
    return response;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: { selectOrder: (state) => state.order },
  extraReducers: (buider) => {
    buider.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
      state.order = action.payload.orders[0];
    });
  }
});

export default orderSlice.reducer;
export const { selectOrder } = orderSlice.selectors;
