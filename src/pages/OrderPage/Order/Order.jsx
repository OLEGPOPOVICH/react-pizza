/* eslint-disable prettier/prettier */
import { DOUGH } from "../../../constants";
import "./index.css";

export const Order = ({ order, orderPrice }) => {
  const {
    number,
    date,
    size,
    dough,
    sauce,
    ingredients,
    cardNumber
  } = order;
  const isOrder = Object.keys(order).length;
  const textList = [ `${sauce} соус`, ingredients].flat();

  if (!isOrder) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="order">
      <div className="header__order">
        <span>Заказ {number}</span>
        <span>{date}</span>
        <span>В процессе</span>
      </div>
      <div className="content__order">
        <h2>Пицца на обед в пятницу</h2>
        <div>
          {size} см на {DOUGH[dough]} тесте • {textList.join(" • ")}
        </div>
      </div>
      <div className="footer__order">
        <div className="payment__order">
          <span className="price">{orderPrice} руб</span>
          <span className="payment_system">{cardNumber && cardNumber.substring(cardNumber.length - 4)}</span>
        </div>
        <div className="order__procces">
          <span>Доставляется</span>
        </div>
      </div>
    </div>
  );
};
