import { useEffect } from 'react';
import { useAppStateContext } from '../useAppStateContext/useAppStateContext';
import { PizzaComposition, PizzaForm } from './Components';
import { fetchIngredients } from './utils';
import './styles.css';

export const PizzaConstructor = () => {
  const { appState, setAppStatePizza } = useAppStateContext();

  useEffect(() => {
    try {
      (async function (){
        const ingredients = fetchIngredients(0);
        setAppStatePizza(ingredients.data)
      }());
    } catch (error) {

    }
  }, []);

  return (
    <>
      {
        !appState.isLoaded
        ? <div>Loading ...</div>
        :
        <>
          <PizzaComposition />
          <PizzaForm />
        </>
      }
    </>
  )
}
