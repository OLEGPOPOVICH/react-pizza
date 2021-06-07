/* eslint-disable prettier/prettier */
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";

const PizzaConstructorContext = createContext();

const getTotalPrice = (pizzaWatch, pizzaData) => {
  const valuesPizzaWatch = Object.values(pizzaWatch).flat();
  const valuesPizzaData = Object.values(pizzaData).flat();

  return valuesPizzaData.reduce((acc, data) => {
    if (valuesPizzaWatch.includes(data.value)) {
      acc += data.price;
    }

    return acc;
  }, 0);
};

export const ProviderPizzaConstructor = ({
  pizzaDefault,
  pizzaData,
  children
}) => {
  const { watch, ...other } = useForm({
    mode: "all",
    devaultValues: pizzaDefault,
  });
  const keysToppings = Object.keys(pizzaData);
  const pizzaWatch = keysToppings.reduce((acc, key) => {
    const valuesWatch = watch(key);

    if (valuesWatch) {
      acc[key] = Array.isArray(valuesWatch) ? valuesWatch : [valuesWatch];
    }

    return acc;
  }, {});
  const isPizzaWatch = Object.values(pizzaWatch).length;
  const totalPrice = getTotalPrice(pizzaWatch, pizzaData);

  return (
    <PizzaConstructorContext.Provider
      value={{
        pizzaData,
        isPizzaWatch,
        pizzaWatch,
        totalPrice,
        watch,
        ...other,
      }}
    >
      {children}
    </PizzaConstructorContext.Provider>
  );
};

export const usePizzaConstructorContext = () => useContext(PizzaConstructorContext);
