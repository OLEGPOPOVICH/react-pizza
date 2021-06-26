/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getTopping } from "api";
import { useAppStateContext } from "../../AppStateContext";
import { PizzaConstructorProvider } from "./PizzaConstructorContext";
import { PizzaForm } from "./PizzaForm";
import { PizzaSummary } from "./PizzaSummary";

import "./index.css";
import { filterByGroupToppings } from "./utils";

export const PizzaConstructorPage = () => {
  const history = useHistory();
  const [pizzaData, setPizzaData] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const { createNewOrder } = useAppStateContext();
  const { isError, error } = useQuery("toppings", getTopping, {
    retry: 2,
    onSuccess: ({ data }) => {
      const toppings = filterByGroupToppings(data);

      setPizzaData(toppings);
      setIsloading(false);
    }
  })

  const handleSubmit = (order) => {
    createNewOrder(order);
    history.push("/checkout");
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="page">
      <div className="page__caption">
        <h1>Собери свою пиццу</h1>
      </div>
      <div className="two__col">
        <PizzaConstructorProvider pizzaData={pizzaData}>
          <div className="col">
            <PizzaForm onSubmit={handleSubmit} />
          </div>
          <div className="col">
            <PizzaSummary />
          </div>
        </PizzaConstructorProvider>
      </div>
    </div>
  );
};
