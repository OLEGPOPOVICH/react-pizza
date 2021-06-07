import { Route, Switch } from "react-router-dom";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { AppLayout } from "./layouts/AppLayout/AppLayout";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { OrderPage } from "./pages/OrderPage";
import { OrdersPage } from "./pages/OrdersPage";
import { PizzaConstructorPage } from "./pages/PizzaConstructorPage";
import { NotFoundPage } from "./pages/NotFoundPage";

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
      <Route path="/checkout">
        <CheckoutPage />
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
