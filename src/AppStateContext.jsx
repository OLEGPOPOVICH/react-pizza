/* eslint-disable import/named */
import { createContext, useContext, useReducer } from "react";
import { localSt } from "common/utils/localStorage";
import { reducer, CREATE_NEW_ORDER, UPDATE_ORDER, LOGIN, LOGOUT } from "reducer";
import { getDateFormat } from "./common/utils/date";

const initialState = {
  isAuth: false,
  isLoading: true,
  order: {},
};

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createNewOrder = (order) => {
    const { price, size, dough, sauce, ...toppings } = order;
    const ingredients = Object.values(toppings).flat(2);
    const newOrder = {
      size,
      dough,
      sauce,
      ingredients,
      price,
      date: getDateFormat({ date: new Date(), format: "DD.MM.YYYY в HH:mm:ss" }),
      status: 1,
    };

    localSt.setItem("order", newOrder);

    dispatch({
      type: CREATE_NEW_ORDER,
      payload: { ...newOrder },
    });
  };

  const updateOrder = (data) => {
    const { order } = state;

    dispatch({
      type: UPDATE_ORDER,
      payload: { ...order, ...data },
    });
  };

  const login = () => {
    dispatch({ type: LOGIN });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AppStateContext.Provider
      value={{
        state,
        createNewOrder,
        updateOrder,
        login,
        logout,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => useContext(AppStateContext);
