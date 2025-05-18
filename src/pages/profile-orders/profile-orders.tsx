import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchProfileOrders,
  selectProfileOrders
} from '../../services/slices/profileOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectProfileOrders);
  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
