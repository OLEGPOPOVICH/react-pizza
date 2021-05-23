/* eslint-disable prettier/prettier */
import { Route, Switch } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { OrderPage } from './pages/OrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { CheckPage } from './pages/CheckPage';
import { PizzaConstructorPage } from './pages/PizzaConstructorPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <AppLayout>
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
  </AppLayout>
);