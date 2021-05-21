/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useAppStateContext } from 'useAppStateContext';
import { useHistory } from 'react-router-dom';
import { getData } from 'dataServices';
import { PizzaForm, PizzaSummary } from './Components';
import './styles.css';

export const PizzaConstructorPage = () => {
  const {
    isLoading,
    setPizzaData,
    createNewOrder
  } = useAppStateContext();
  const history = useHistory();

  const handleSubmit = () => {
    createNewOrder();
    history.push('/order');
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getData({
        timeout: 1000,
      });

      setPizzaData(data);
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
        <PizzaForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
