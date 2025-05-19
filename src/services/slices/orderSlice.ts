import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrderState = {
  order: TOrder | null;
  createdOrder: TOrder | null;
  createdOrderLoading: boolean;
};

const initialState: OrderState = {
  order: null,
  createdOrder: null,
  createdOrderLoading: false
};

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number) => {
    const response = getOrderByNumberApi(number);
    return response;
  }
);

export const createOrderThunk = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCreatedOrder: (state) => {
      state.createdOrder = null;
    }
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectCreatedOrder: (state) => state.createdOrder,
    selectCreatedOrderLoading: (state) => state.createdOrderLoading
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.createdOrderLoading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.createdOrderLoading = false;
        state.createdOrder = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.createdOrderLoading = false;
      });
  }
});

export default orderSlice.reducer;
export const { selectOrder, selectCreatedOrder, selectCreatedOrderLoading } =
  orderSlice.selectors;
export const { clearCreatedOrder } = orderSlice.actions;
