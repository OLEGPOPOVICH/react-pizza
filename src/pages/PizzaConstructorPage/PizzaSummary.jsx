/* eslint-disable prettier/prettier */
import { Button } from "common/Components/Button/Button";
import { TextList } from "common/Components/TextList/TextList";
import { usePizzaConstructorContext } from "pages/PizzaConstructorPage/PizzaConstructorContext";
import { DOUGH } from "../../constants";

export const PizzaSummary = () => {
  const { pizzaWatch, totalPrice } = usePizzaConstructorContext();
  const { size, dough, sauce, ...ingredients } = pizzaWatch;
  const toppings = Object.values(ingredients);
  const textList = [ `${sauce} соус`, toppings].flat(2);

  return (
    <>
      <div className="pizza__result">
        <img src="https://clipart-best.com/img/pizza/pizza-clip-art-7.png" alt="Твоя пицца" />
        <h2>Твоя пицца</h2>
        <div>
          {size} cм на {DOUGH[dough]} тесте
        </div>
        <div data-testid="ingredients">
          <TextList
            textList={textList}
            className="text__list-line"
          />
        </div>
        <Button
          form="order"
          title={`Заказать за ${totalPrice} руб`}
          data-testid="btn-order"
          btnType="submit"
          btnClassName="button-primary"
        />
      </div>
    </>
  );
};
