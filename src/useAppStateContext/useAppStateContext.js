import { createContext, useContext } from "react";
import { useAppState } from "./useAppState";
import {
  getTotalPricePizza
} from "./utils";


const AppStateContext = createContext();

export const AppStateProvider = ({
  children
}) => {
  const [appState, setAppState] = useAppState();

  const setAppStatePizza = (
    appStatePizza
  ) => {
    setAppState({
      ...appState,
      pizza: appStatePizza,
      isLoaded: true
    });
  }

  const setIngredientAppState = (
    ingredients,
    ingredientType
  ) => {
    setAppState({
      ...appState,
      pizza: {
        ...appState.pizza,
        [ingredientType]: ingredients
      }
    });
  }

  return (
    <AppStateContext.Provider value={{
      appState,
      setAppStatePizza,
      setIngredientAppState,
      getTotalPricePizza
    }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppStateContext = () => useContext(AppStateContext);