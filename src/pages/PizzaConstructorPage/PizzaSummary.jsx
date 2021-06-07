/* eslint-disable prettier/prettier */
import { Button } from "common/Components/Button/Button";
import { TextList } from "common/Components/TextList/TextList";
import { usePizzaConstructorContext } from "pages/PizzaConstructorPage/usePizzaConstructorContext";
import { DOUGH } from "../../constants";

export const PizzaSummary = ({
  onClick
}) => {
  const { isPizzaWatch, pizzaWatch, totalPrice } = usePizzaConstructorContext();
  const { size, dough, ...toppings } = pizzaWatch;

  if (!size) {
    return <div>Loading ...</div>;
  }

  const handleClick = () => {
    onClick();
  }

  return (
    <>
      <div className="pizza__result">
        <img src="https://clipart-best.com/img/pizza/pizza-clip-art-7.png" alt="" />
        <h2>Твоя пицца</h2>
        <div>
          {size[0]} cм на {DOUGH[dough[0]]} тесте
        </div>
        <div data-testid="ingredients">
          <TextList
            textList={Object.values(toppings).flat()}
            className="text__list-line"
          />
        </div>
        <Button
          title={`Заказать за ${totalPrice} руб`}
          data-testid="btn-order"
          btnClassName="button-primary"
          onClick={handleClick}
        />
      </div>
    </>
  );
};
