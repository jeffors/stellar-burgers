import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearCounstructor,
  selectConstructorItems
} from '../../services/slices/burgerConstructorSlice';
import {
  clearCreatedOrder,
  createOrderThunk,
  selectCreatedOrder,
  selectCreatedOrderLoading
} from '../../services/slices/orderSlice';
import {
  selectIsAuthChecked,
  selectUser
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };
  const constructorItems = useSelector(selectConstructorItems);

  const orderRequest = useSelector(selectCreatedOrderLoading);

  const orderModalData = useSelector(selectCreatedOrder);

  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ing: TConstructorIngredient) => ing._id
      ),
      constructorItems.bun._id
    ];

    dispatch(createOrderThunk(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(clearCreatedOrder());
    dispatch(clearCounstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
