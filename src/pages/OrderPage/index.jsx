import { Order } from './Components/Order';
import './index.css';

export const OrderPage = () => (
  <div className="wrapper__order">
    <h1 className="txt-center">Оформление заказа</h1>
    <div className="orders">
      <Order />
    </div>
  </div>
);
