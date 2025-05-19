import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const response = await getFeedsApi();
  return response;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { selectFeedOrders, selectFeedTotal, selectFeedTotalToday } =
  feedSlice.selectors;
export default feedSlice.reducer;
