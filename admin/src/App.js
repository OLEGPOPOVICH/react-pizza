import { NavLink, Route, Switch } from "react-router-dom";
import { CreateIngredientPage } from "./pages/CreateIngredientPage/CreateIngredientPage";
import { IngredientsPage } from "./pages/IngredientsPage/IngredientsPage";

export const App = () => (
  <>
    <header>
      <div className="container">
        <nav>
          <NavLink exact activeClassName='link-active' to="/">Топпинги</NavLink>
          <NavLink activeClassName='link-active' to="/create-topping">Создать топпинг</NavLink>
        </nav>
      </div>
    </header>
    <main>
      <div className="container">
        <Switch>
          <Route path="/create-topping">
            <CreateIngredientPage />
          </Route>
          <Route exact path="/">
            <IngredientsPage />
          </Route>
        </Switch>
        </div>
    </main>
  </>
);
