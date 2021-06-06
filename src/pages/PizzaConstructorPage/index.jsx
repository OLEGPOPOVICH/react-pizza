/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getData } from "../../dataServices";
import { useAppStateContext } from "../../useAppStateContext";
import { PizzaForm } from "./PizzaForm";
import { PizzaSummary } from "./PizzaSummary";
import { ProviderPizzaConstructor } from "./usePizzaConstructorContext";
import "./index.css";

export const PizzaConstructorPage = () => {
  const {
    pizzaData,
    isLoading,
    setPizzaData,
  } = useAppStateContext();
  const history = useHistory();
  const [pizzaDefault, setPizzaDefault] = useState({});

  const onClick = () => {
    history.push("/checkout");
  };

  const setDataPizzaDefault = (data) => {
    const dataDefault = {}
    const keysData = Object.keys(data);

    keysData.forEach((key) =>  {
      dataDefault[key] = data[key].reduce((acc, topping) => {
        if (topping.checked) {
          acc.push(topping.value);
        }

        return acc;
      }, [])
    });

    setPizzaDefault(dataDefault);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getData({
        timeout: 1000,
      });

      setPizzaData(data);
      setDataPizzaDefault(data);
    }
    fetchData();
  }, []);

  if (!isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="page">
      <div className="page__caption">
        <h1>Собери свою пиццу</h1>
      </div>
      <div className="two__col">
        <ProviderPizzaConstructor pizzaDefault={pizzaDefault} pizzaData={pizzaData}>
          <div className="col">
            <PizzaForm />
          </div>
          <div className="col">
            <PizzaSummary onClick={onClick} />
          </div>
        </ProviderPizzaConstructor>
      </div>
    </div>
  );
};
