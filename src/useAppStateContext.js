/* eslint-disable import/named */
import { createContext, useContext, useReducer } from "react";
import { reducer, SET_PIZZA_DATA, UPDATE_INGREDIENT, CREATE_NEW_ORDER } from "reducer";
import { getDoughPizza, getIngredientsPizza, getSaucePizza, getSizePizza, getTotalPrice } from "utils";

const initialState = {
  isAuth: false,
  isLoading: false,
  pizzaData: {},
  orders: [],
  order: {},
};

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pizzaData, isLoading, orders } = state;
  const countOrders = orders.length;
  const totalPrice = getTotalPrice(pizzaData);
  const isPizzaData = Object.values(pizzaData).length;

  const setPizzaData = (data) => {
    dispatch({
      type: SET_PIZZA_DATA,
      payload: data,
    });
  };

  const updateIngredient = (ingredient) => {
    dispatch({
      type: UPDATE_INGREDIENT,
      payload: ingredient,
    });
  };

  const createNewOrder = () => {
    const { size, dough, sauce, ...ingredients } = pizzaData;

    dispatch({
      type: CREATE_NEW_ORDER,
      payload: {
        number: countOrders + 1,
        date: new Date(),
        size: getSizePizza(size),
        dough: getDoughPizza(dough),
        sauce: getSaucePizza(sauce),
        price: totalPrice,
        ingredients: getIngredientsPizza(ingredients),
        status: 1,
      },
    });
  };

  return (
    <AppStateContext.Provider
      value={{
        state,
        pizzaData,
        isPizzaData,
        isLoading,
        totalPrice,
        setPizzaData,
        updateIngredient,
        createNewOrder,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => useContext(AppStateContext);
