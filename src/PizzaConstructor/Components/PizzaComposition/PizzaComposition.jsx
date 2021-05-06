import { useEffect } from "react";
import { useAppStateContext } from "../../../useAppStateContext/useAppStateContext"
import { renderPizzaComposition } from "../../utils";


export const PizzaComposition = () => {
  const {
    appState
  } = useAppStateContext();

  return (
    <>
      <h2>Твоя пицца</h2>
      {renderPizzaComposition(appState.pizza)}
    </>
  )
}
