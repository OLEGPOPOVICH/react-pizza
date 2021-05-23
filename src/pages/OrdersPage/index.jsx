import { Order } from '../OrderPage/Components';
import './index.css';

export const OrdersPage = () => (
  <div className="wrapper__orders">
    <h1 className="txt-center">Заказы</h1>
    <div className="orders">
      <Order />
      <Order />
    </div>
  </div>
);
