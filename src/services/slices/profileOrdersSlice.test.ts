import { TOrder } from '@utils-types';
import reducer, { fetchProfileOrders, initialState } from './profileOrdersSlice';

const orders: TOrder[] = [
  {
    _id: '682a108fc2f30c001cb2501d',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный метеоритный бургер',
    createdAt: '2025-05-18T16:53:35.514Z',
    updatedAt: '2025-05-18T16:53:36.180Z',
    number: 77672
  },
  {
    _id: '682a132bc2f30c001cb25027',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2025-05-18T17:04:43.560Z',
    updatedAt: '2025-05-18T17:04:44.384Z',
    number: 77673
  }
];

describe('Тестирование слайса с заказами пользователя', () => {
  it('Экшен успешного выполнения (fulfilled)', () => {
    const state = reducer(initialState, {
      type: fetchProfileOrders.fulfilled.type,
      payload: orders
    });

    expect(state.orders).toEqual(orders)
  });
});
