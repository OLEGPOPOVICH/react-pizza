import { createContext, useContext, useReducer } from 'react';
import { reducer } from 'reducer';

const initialState = {
  isLoading: false,
  pizzaData: {},
  orders: [],
  order: {},
};

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider
      value={{
        state,
        pizzaData: state.pizzaData,
        isLoading: state.isLoading,
        dispatch,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => useContext(AppStateContext);
