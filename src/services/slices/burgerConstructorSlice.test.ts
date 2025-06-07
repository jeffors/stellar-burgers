import { TIngredient } from '@utils-types';
import reducer, {
  addIngredient,
  clearCounstructor,
  ConstructorState,
  initialState,
  moveIngredient,
  removeIngredient
} from './burgerConstructorSlice';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'nano-id'
}));

describe('Тестирование конструктора бургера', () => {
  const bun: TIngredient = {
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
  };

  const main: TIngredient = {
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
  };

  const sauce: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  describe('Добавление ингридиентов', () => {
    it('Добавление булки', () => {
      const newState = reducer(initialState, addIngredient(bun));
      expect(newState.bun).toEqual({ ...bun, id: 'nano-id' });
      expect(newState.ingredients).toEqual([]);
    });
    it('Добавление начинки/соуса', () => {
      const newState = reducer(initialState, addIngredient(main));
      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([{ ...main, id: 'nano-id' }]);
    });
  });
  describe('Удаление ингридиентов', () => {
    it('Удаление конкретного ингридиента', () => {
      const previousState: ConstructorState = {
        bun: null,
        ingredients: [
          { ...main, id: 'main' },
          { ...sauce, id: 'sauce' }
        ]
      };

      const newState = reducer(previousState, removeIngredient('sauce'));
      expect(newState.ingredients).toEqual([{ ...main, id: 'main' }]);
    });
    it('Полная очистка конструктора', () => {
      const previousState: ConstructorState = {
        bun: { ...bun, id: 'bun' },
        ingredients: [
          { ...main, id: 'main' },
          { ...sauce, id: 'sauce' }
        ]
      };

      const newState = reducer(previousState, clearCounstructor());
      expect(newState).toEqual(initialState);
    });
  });
  describe('Перемещение ингридиентов в конструкторе', () => {
    const previousState: ConstructorState = {
      bun: null,
      ingredients: [
        { ...main, id: 'main-1' },
        { ...sauce, id: 'sauce-2' },
        { ...main, id: 'main-3' }
      ]
    };
    it('Перетаскиваем вверх', () => {
      const newState = reducer(
        previousState,
        moveIngredient({ indexFrom: 0, indexTo: 1 })
      );
      expect(newState.ingredients.map((ingredient) => ingredient.id)).toEqual([
        'sauce-2',
        'main-1',
        'main-3'
      ]);
    });
    it('Перетаскиваем вниз', () => {
      const newState = reducer(
        previousState,
        moveIngredient({ indexFrom: 2, indexTo: 1 })
      );
      expect(newState.ingredients.map((ingredient) => ingredient.id)).toEqual([
        'main-1',
        'main-3',
        'sauce-2'
      ]);
    });
  });
});
