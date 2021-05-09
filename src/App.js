/* eslint-disable react/button-has-type */
import { CommonLoyout } from './common/Loyout';
import { PizzaConstructorPage } from './pages/PizzaConstructorPage/PizzaConstructorPage';

function App() {
  return (
    <CommonLoyout>
      <PizzaConstructorPage />
      <button
        onClick={() => {
          throw new Error('Something went wron');
        }}
      >
        Break the world
      </button>
      ;
    </CommonLoyout>
  );
}

export default App;
