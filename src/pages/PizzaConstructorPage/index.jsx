import { useEffect } from 'react';
import { useAppStateContext } from 'useAppStateContext';
import { getData } from 'dataServices';
import { SET_PIZZA_DATA } from 'reducer';
import { PizzaForm, PizzaSummary } from './Components';
import './styles.css';

export const PizzaConstructorPage = () => {
  const { isLoading, state, dispatch } = useAppStateContext();

  useEffect(() => {
    async function fetchData() {
      const pizzaData = await getData({
        timeout: 1000,
      });

      dispatch({
        type: SET_PIZZA_DATA,
        payload: pizzaData,
      });
    }
    fetchData();
  }, []);

  if (!isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="page__pizza">
      <div className="caption caption__pizza">
        <h1>Собери свою пиццу</h1>
      </div>
      <div className="content__pizza padding-16">
        <PizzaSummary />
        <PizzaForm />
      </div>
    </div>
  );
};
