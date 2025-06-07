import reducer, {
  createOrderThunk,
  fetchOrderByNumber,
  initialState
} from './orderSlice';

const orderByNumber = {
  success: true,
  orders: [
    {
      _id: '6841a5ecc2f30c001cb2a2aa',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093c'
      ],
      owner: '68417f5ac2f30c001cb2a237',
      status: 'done',
      name: 'Краторный бессмертный метеоритный бургер',
      createdAt: '2025-06-05T14:13:00.687Z',
      updatedAt: '2025-06-05T14:13:01.388Z',
      number: 80339
    }
  ]
};

const createOrder = {
  success: true,
  name: 'Краторный метеоритный бургер',
  order: {
    ingredients: [
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
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
      },
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
      }
    ],
    _id: '6841a8ebc2f30c001cb2a2bc',
    owner: {
      name: 'test',
      email: 'test@test.ru',
      createdAt: '2025-05-18T10:35:45.364Z',
      updatedAt: '2025-05-19T10:25:51.204Z'
    },
    status: 'done',
    name: 'Краторный метеоритный бургер',
    createdAt: '2025-06-05T14:25:47.266Z',
    updatedAt: '2025-06-05T14:25:47.992Z',
    number: 80342,
    price: 5510
  }
};

const createOrderPayload = {
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa093c'
  ]
};

describe('Тестирование получения заказа по номеру', () => {
  it('Экшен успешного выполнения (fulfilled)', () => {
    const state = reducer(initialState, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: orderByNumber
    });
    expect(state.order).toEqual(orderByNumber.orders[0]);
  });
});
describe('Тестирование отправки заказа', () => {
  it('Экшен начала запроса (pending)', () => {
    const state = reducer(initialState, {
      type: createOrderThunk.pending.type
    });
    expect(state.createdOrderLoading).toBe(true);
  });
  it('Экшен успешного выполнения (fulfilled)', () => {
    const state = reducer(initialState, {
      type: createOrderThunk.fulfilled.type,
      payload: createOrder
    });
    expect(state.createdOrderLoading).toBe(false);
    expect(state.createdOrder).toEqual(createOrder);
  });
    it('Экшен ошибки запроса (rejected)', () => {
    const state = reducer(initialState, {
      type: createOrderThunk.rejected.type
    });
    expect(state.createdOrderLoading).toBe(false);
  });
});
