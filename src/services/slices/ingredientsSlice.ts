import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectIngredients: (state: IngredientsState) => state.ingredients,
    selectIngredientsLoading: (state: IngredientsState) => state.isLoading
  }
});

export default ingredientsSlice.reducer;
export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;
