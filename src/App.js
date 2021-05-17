import { Route, Switch } from 'react-router-dom';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { OrderPage } from 'pages/OrderPage/OrderPage';
import { OrdersPage } from 'pages/OrdersPage/OrdersPage';
import { CheckPage } from 'pages/CheckPage/CheckPage';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { CommonLoyout } from './common/Loyout';
import { PizzaConstructorPage } from './pages/PizzaConstructorPage/PizzaConstructorPage';

function App() {
  return (
    <CommonLoyout>
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <Route path="/order">
          <OrderPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/check">
          <CheckPage />
        </Route>
        <Route exact path="/">
          <PizzaConstructorPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </CommonLoyout>
  );
}

export default App;
