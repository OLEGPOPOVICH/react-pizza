import { PizzaConstructor } from "../../PizzaConstructor/PizzaConstructor"
import './styles.css';

export const PizzaConstructorPage = () => {
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
}
