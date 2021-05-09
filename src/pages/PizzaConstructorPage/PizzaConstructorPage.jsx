import { useEffect } from 'react';
import { PizzaConstructor } from '../../PizzaConstructor/PizzaConstructor';
import { dataServices } from '../../servecis/dataServices';
import { useAppStateContext } from '../../useAppStateContext/useAppStateContext';
import './styles.css';

export const PizzaConstructorPage = () => {
  const { isLoading, setPizzaData } = useAppStateContext();

  useEffect(() => {
    async function fetchData() {
      const pizzaData = await dataServices.getPizzaData({
        timeout: 1000,
      });
      setPizzaData(pizzaData);
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
        <PizzaConstructor />
      </div>
    </div>
  );
};
