import { createContext, useContext } from 'react';
import { useAppState } from './useAppState';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useAppState();

  const setPizzaData = (pizzaData) => {
    setAppState({
      ...appState,
      pizzaData,
      isLoading: true,
    });
  };

  return (
    <AppStateContext.Provider
      value={{
        appState,
        isLoading: appState.isLoading,
        setPizzaData,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => useContext(AppStateContext);
