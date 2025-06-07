import { TOrdersData } from '@utils-types';
import reducer, { fetchFeed, initialState } from './feedSlice';

const feed: TOrdersData = {
  orders: [
    {
      _id: '68401a55c2f30c001cb29e53',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный space астероидный био-марсианский люминесцентный бургер',
      createdAt: '2025-06-04T10:05:09.052Z',
      updatedAt: '2025-06-04T10:05:09.875Z',
      number: 80195
    },
    {
      _id: '6840147ec2f30c001cb29e35',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный бургер',
      createdAt: '2025-06-04T09:40:14.345Z',
      updatedAt: '2025-06-04T09:40:15.098Z',
      number: 80194
    }
  ],
  total: 79821,
  totalToday: 166
};

describe('Тестирование слайса с лентой заказов', () => {
  it('Экшен успешного выполнения (fulfilled)', () => {
    const state = reducer(initialState, {
      type: fetchFeed.fulfilled.type,
      payload: feed
    });

    expect(state.orders).toEqual(feed.orders);
    expect(state.total).toEqual(feed.total);
    expect(state.totalToday).toEqual(feed.totalToday);
  });
});
