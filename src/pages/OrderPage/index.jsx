/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppStateContext } from "AppStateContext";
import { localSt } from "common/utils/localStorage";
import { Notification } from "common/Components/Notification/Notification";
import { Order } from "./Order/Order";
import "./index.css";

export const OrderPage = () => {
  const history = useHistory();
  const { state } = useAppStateContext();
  const [order, setOrder] = useState(state.order);

  useEffect(() => {
    if (!Object.keys(order).length) {
      const orderLocalSt = localSt.getItem("order");

      if (orderLocalSt) {
        setOrder(orderLocalSt);
      } else {
        history.push("/");
      }
    }
  }, []);

  return (
    <div className="wrapper__order">
      <h1 className="txt-center">Оформление заказа</h1>
      <Notification
        status="success"
        title="Спасибо за заказ!"
        message="Заказ успешно оплачен, ждите вашу пиццу уже через час"
        icon
      />
      <div className="orders">
        <Order order={order} orderPrice={order.totalPrice} />
      </div>
    </div>
  );
};
