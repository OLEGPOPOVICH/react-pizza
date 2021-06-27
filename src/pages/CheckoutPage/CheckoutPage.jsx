import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { localSt } from "common/utils/localStorage";
import { Order } from "pages/OrderPage/Order/Order";
import { useAppStateContext } from "AppStateContext";
import { createOrder, getOrdersCount } from "api";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutResult } from "./CheckoutResult";
import { CheckoutPageProvider } from "./CheckoutPageContext";

export const CheckoutPage = () => {
  const history = useHistory();
  const { state, updateOrder } = useAppStateContext();
  const [order, setOrder] = useState(state.order);
  const [newOrder, setNewOrder] = useState({});
  const [deviveryPrice, setDeliveryPrice] = useState(200);
  const { data: dataCount } = useQuery("ordersCount", getOrdersCount);
  const { isError, error } = useQuery(["checkout", newOrder], () => createOrder(newOrder), {
    enabled: !!newOrder.date,
    retry: false,
    onSuccess: () => {
      localSt.setItem("order", newOrder);
      updateOrder(newOrder);
      history.push("/order");
    },
  });

  const handleClick = (data) => {
    setNewOrder({
      number: dataCount.count + 1,
      deviveryPrice,
      totalPrice: order.price + deviveryPrice,
      ...data,
      ...order,
    });
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

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

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
