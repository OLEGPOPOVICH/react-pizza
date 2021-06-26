/* eslint-disable prettier/prettier */
import { TextList } from "common/Components/TextList/TextList";
import { DOUGH } from "../../../constants";
import "./index.css";

export const Order = ({ order }) => {
  const {
    size,
    dough,
    number,
    date,
    status,
    cheese,
    meat,
    sauce,
    price,
  } = order;
  const isOrder = Object.keys(order).length;
  const textList = [cheese, meat, sauce].flat().filter(topping => topping);

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
          {size} см на {DOUGH[dough]} тесте • <TextList textList={textList} />
        </div>
      </div>
      <div className="footer__order">
        <div className="payment__order">
          <span className="price">{price} руб</span>
          <span className="payment_system">2345</span>
        </div>
        <div className="order__procces">
          <span>Доставляется</span>
        </div>
      </div>
    </div>
  );
};
