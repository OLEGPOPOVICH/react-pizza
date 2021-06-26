/* eslint-disable import/named */
import { createContext, useContext, useReducer } from "react";
import { localSt } from "common/utils/localStorage";
import { reducer, CREATE_NEW_ORDER, LOGIN, LOGOUT } from "reducer";
import { getDateFormat } from "./common/utils/date";

const initialState = {
  isAuth: false,
  isLoading: true,
  orders: [],
  order: {},
};

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, orders } = state;
  const countOrders = orders.length;

  const createNewOrder = (order) => {
    const newOrder = {
      number: countOrders + 1,
      date: getDateFormat({ date: new Date(), format: "DD.MM.YYYY в HH:mm:ss" }),
      ...order,
      status: 1,
    };

    localSt.setItem("order", newOrder);

    dispatch({
      type: CREATE_NEW_ORDER,
      payload: { ...newOrder },
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
        isLoading,
        createNewOrder,
        login,
        logout,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => useContext(AppStateContext);
