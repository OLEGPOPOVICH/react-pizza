import { RadioGroup, utilsComponent } from "../../../common/Components"
import { useAppStateContext } from "../../../useAppStateContext/useAppStateContext";
import { getIngredientsAppStatePizza, renderCheckBox, renderRadioButton } from "../../utils";

export const PizzaForm = () => {
  const {
    appState,
    setIngredientAppState,
    getTotalPricePizza
  } = useAppStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Ваш заказ на ${getTotalPricePizza(appState.pizza)} руб`)
  }

  const handlerIngredient = ({component}) => {
    const {
      value,
      name,
      type,
      checked
    } = component;
    const ingredients = appState.pizza && appState.pizza[name];

    utilsComponent.setChecked({
      buttons: ingredients,
      buttonType: type,
      currentValue: value,
      currentChecked: checked
    });

    setIngredientAppState(ingredients, name)
  }

  const getValueSelectedIngredient = (ingredientType) => {
    const ingredients = getIngredientsAppStatePizza(appState.pizza, ingredientType);
    return ingredients
      ? utilsComponent.getValueSelectedRadioButton({
          buttons: ingredients
        })
      : '';
  }

  const renderIngredientRadioButtons = (
    ingredientType
  ) => {
    const ingredients = getIngredientsAppStatePizza(appState.pizza, ingredientType);

    if (!(
      ingredients
      && Array.isArray(ingredients)
    )) {
      return null;
    }

    return ingredients.map((ingredient) => {
      return renderRadioButton({
        button: ingredient
      });
    })
  }

  const renderIngredientsCheckBox = (
    ingredientType
  ) => {
    const ingredients = getIngredientsAppStatePizza(appState.pizza, ingredientType);

    if (!(
      ingredients
      && Array.isArray(ingredients)
    )) {
      return null;
    }

    return ingredients.map((ingredient) => {
      return (
        <div key={ingredient.value}>
          {ingredient.value}
          {
            renderCheckBox({
              button: ingredient,
              buttonName: ingredientType,
              buttonHandler: handlerIngredient
            })
          }
        </div>
      )
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <RadioGroup
        value={getValueSelectedIngredient('size')}
        label="Размер"
        name="size"
        type="line"
        onChange={handlerIngredient}
      >
        {renderIngredientRadioButtons('size')}
      </RadioGroup>

      <hr/>
      <RadioGroup
        value={getValueSelectedIngredient('dough')}
        label="Тесто"
        name="dough"
        type="line"
        onChange={handlerIngredient}
      >
        {renderIngredientRadioButtons('dough')}
      </RadioGroup>

      <hr/>
      <RadioGroup
        value={getValueSelectedIngredient('sauce')}
        label="Выберите соус"
        name="sauce"
        type="line"
        onChange={handlerIngredient}
      >
        {renderIngredientRadioButtons('sauce')}
      </RadioGroup>

      <hr/>
      <div>
        Добавьте сыр
        <hr/>
        {renderIngredientsCheckBox('cheese')}
      </div>

      <hr/>
      <div>
        Добавьте овощи
        <hr/>
        {renderIngredientsCheckBox('vegetables')}
      </div>

      <hr/>
      <div>
        Добавьте мясо
        <hr/>
        {renderIngredientsCheckBox('meat')}
      </div>

      <hr/>
      <button
        data-testid="btn-order"
        type="submit"
      >Заказать за {getTotalPricePizza(appState.pizza)} руб</button>
    </form>
  )
}
