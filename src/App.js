/* eslint-disable react/button-has-type */
import { CommonLoyout } from './common/Loyout';
import { PizzaConstructorPage } from './pages/PizzaConstructorPage/PizzaConstructorPage';

function App() {
  return (
    <CommonLoyout>
      <PizzaConstructorPage />
      <button onClick={methodDoesNotExist}>Break the world</button>;
    </CommonLoyout>
  );
}

export default App;
