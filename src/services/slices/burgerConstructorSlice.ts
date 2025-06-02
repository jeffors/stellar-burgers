import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient: TConstructorIngredient = {
        ...action.payload,
        id: nanoid()
      };
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearCounstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ indexFrom: number; indexTo: number }>
    ) => {
      const { indexFrom, indexTo } = action.payload;
      const ingredients = state.ingredients;
      [ingredients[indexFrom], ingredients[indexTo]] = [
        ingredients[indexTo],
        ingredients[indexFrom]
      ];
    }
  },
  selectors: {
    selectConstructorBun: (state: ConstructorState) => state.bun,
    selectConstructorIngredients: (state: ConstructorState) =>
      state.ingredients,
    selectConstructorItems: (state: ConstructorState) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const {
  addIngredient,
  clearCounstructor,
  moveIngredient,
  removeIngredient
} = constructorSlice.actions;

export const {
  selectConstructorBun,
  selectConstructorIngredients,
  selectConstructorItems
} = constructorSlice.selectors;

export default constructorSlice.reducer;
