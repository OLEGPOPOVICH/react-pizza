/* eslint-disable prettier/prettier */
import { Route, Switch } from 'react-router-dom';
import { AppLayout } from 'layouts/AppLayout/index';
import { AuthPage } from 'pages/AuthPage/index';
import { RegistrationPage } from 'pages/RegistrationPage/index';
import { OrderPage } from 'pages/OrderPage/index';
import { OrdersPage } from 'pages/OrdersPage/index';
import { CheckPage } from 'pages/CheckPage/index';
import { PizzaConstructorPage } from 'pages/PizzaConstructorPage/index';
import { NotFoundPage } from 'pages/NotFoundPage/index';

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