import { useAppStateContext } from '../useAppStateContext/useAppStateContext';
import { PizzaForm } from './Components/PizzaForm/PizzaForm';
import { PizzaSammary } from './Components/PizzaSammary/PizzaSammary';
import { usePizzaConstructor } from './usePizzaConstructor';

export const PizzaConstructor = () => {
  const { appState } = useAppStateContext();
  const { dispatch } = usePizzaConstructor(appState);

  return (
    <>
      <PizzaSammary {...appState} />
      <PizzaForm appState={appState} dispatch={dispatch} />
    </>
  );
};
