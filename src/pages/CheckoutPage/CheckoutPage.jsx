import { useHistory } from "react-router-dom";
import { localSt } from "common/utils/localStorage";
import { Order } from "pages/OrderPage/Order/Order";
import { useEffect, useState } from "react";
import { useAppStateContext } from "AppStateContext";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutResult } from "./CheckoutResult";
import { CheckoutPageProvider } from "./CheckoutPageContext";

export const CheckoutPage = () => {
  const history = useHistory();
  const { state } = useAppStateContext();
  const [order, setOrder] = useState(state.order);
  const [deviveryPrice, setDeliveryPrice] = useState(200);

  const handleClick = (data) => {
    const newOrder = {
      deviveryPrice,
      totalPrice: order.price + deviveryPrice,
      ...data,
      ...order,
    };
  };

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
    <div className="page">
      <div className="two__col">
        <CheckoutPageProvider>
          <div className="col">
            <CheckoutForm formSubmit={handleClick} />
          </div>
          <div className="col">
            <Order order={order} orderPrice={order.price} />
            <CheckoutResult orderPrice={order.price} deliveryPrice={deviveryPrice} />
          </div>
        </CheckoutPageProvider>
      </div>
    </div>
  );
};
