import { useAppStateContext } from '../../../../useAppStateContext/useAppStateContext';
import { PizzaForm } from '../PizzaForm/PizzaForm';
import { PizzaSammary } from '../PizzaSammary/PizzaSammary';
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
