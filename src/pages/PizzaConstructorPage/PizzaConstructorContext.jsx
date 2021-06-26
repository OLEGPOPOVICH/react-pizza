/* eslint-disable prettier/prettier */
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { getTotalPrice, getDefaultValues } from "./utils";

const PizzaConstructorContext = createContext();

export const PizzaConstructorProvider = ({
  pizzaData,
  children
}) => {
  const formMethods = useForm({ defaultValues: getDefaultValues(pizzaData) });
  const pizzaWatch = formMethods.watch();
  const totalPrice = getTotalPrice(pizzaWatch, pizzaData);

  return (
    <PizzaConstructorContext.Provider
      value={{
        pizzaData,
        pizzaWatch,
        totalPrice,
        ...formMethods,
      }}
    >
      {children}
    </PizzaConstructorContext.Provider>
  );
};

export const usePizzaConstructorContext = () => useContext(PizzaConstructorContext);
