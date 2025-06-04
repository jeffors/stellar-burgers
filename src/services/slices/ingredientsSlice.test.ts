import { TIngredient } from '@utils-types';
import reducer, { fetchIngredients, initialState } from './ingredientsSlice';

const ingredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('Тестирование слайса с ингридиентами', () => {
  it('Экшен начала запроса (pending)', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.pending.type
    });
    expect(state.isLoading).toBe(true);
  });
  it('Экшен успешного выполнения (fulfilled)', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });
  it('Экшен ошибки запроса', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.rejected.type
    });
    expect(state.isLoading).toBe(false);
  });
});
