/* eslint-disable prettier/prettier */
import { Route, Switch } from 'react-router-dom';
import { AppLayout } from 'Common/Layouts';
import {
  RegistrationPage,
  OrderPage,
  OrdersPage,
  CheckPage,
  PizzaConstructorPage,
  NotFoundPage,
  AuthPage
} from 'Pages/index';

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