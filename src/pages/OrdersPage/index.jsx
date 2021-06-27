import { useState } from "react";
import { useQuery } from "react-query";
import { Order } from "pages/OrderPage/Order/Order";
import { getOrders } from "../../api";
import "./index.css";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { isLoading, isError, error } = useQuery("orders", getOrders, {
    retry: 2,
    onSuccess: ({ data }) => {
      setOrders(data);
    },
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="wrapper__orders">
      <h1 className="txt-center">Заказы</h1>
      <div className="orders">
        {orders.map((order) => (
          <Order key={order.number} order={order} orderPrice={order.totalPrice} />
        ))}
      </div>
    </div>
  );
};
