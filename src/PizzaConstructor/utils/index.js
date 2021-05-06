import { CheckBox, RadioButton } from "../../common/Components";

export const fetchIngredients = (time) => {
  const data = {
    size: [
      {value: '30', label: '30 см', price: 56, selected: true},
      {value: '35', label: '35 см', price: 106, selected: false}
    ],
    dough: [
      {value: 'Тонкое', price: 57, selected: true},
      {value: 'Пышное', price: 107, selected: false}
    ],
    sauce: [
      {value: 'Томатный', price: 29, selected: true},
      {value: 'Майонез', price: 29, selected: false},
      {value: 'Острый', price: 29, selected: false},
      {value: 'Грибной', price: 29, selected: false},
      {value: 'Чесночный', price: 29, selected: false},
      {value: 'Кисло-сладкий', price: 29, selected: false},
      {value: 'Горчичный', price: 29, selected: false}
    ],
    cheese: [
      {value: 'Моцарелла', label: '29 ₽', price: 29, selected: true},
      {value: 'Чеддер', label: '29 ₽', price: 29, selected: false},
      {value: 'Дор Блю', label: '29 ₽', price: 29, selected: false}
    ],
    vegetables: [
      {value: 'Томаты', label: '29 ₽', price: 29, selected: true},
      {value: 'Грибы', label: '29 ₽', price: 29, selected: false},
      {value: 'Перец', label: '29 ₽', price: 29, selected: false}
    ],
    meat: [
      {value: 'Бекон', label: '29 ₽', price: 29, selected: false},
      {value: 'Пепперони', label: '29 ₽', price: 29, selected: false},
      {value: 'Ветчина', label: '29 ₽', price: 29, selected: false}
    ]
  }

  if (!time) {
    return {data};
  }

  return new Promise(resolve => {
    setTimeout(() => resolve( {data} ), time)
  })
}

export const renderCheckBox = ({button, buttonName, buttonHandler}) => {
  const label = button.label ? button.label : button.value;

  return (
    <CheckBox
      value={button.value}
      name={buttonName}
      checked={button.selected}
      label={label}
      onChange={buttonHandler}
    />
  )
}

export const renderRadioButton = ({button}) => {
  const label = button.label ? button.label : button.value;

  return (
    <RadioButton
      key={button.value}
      value={button.value}
      label={label}
    />
  )
}

const DOUGH = {
  'Тонкое': 'тонком',
  'Пышное': 'пышном'
};

/**
 * ## Получить выбранай элемент из списка
 *
 * @param {object[]} elements список элементов
 *
 * @returns {object | string} вернет объект выбранного элемента или пустую строку
 */
const getSelectedElement = (elements) => {
  return elements ? elements.filter((element) => element.selected)[0] : '';
}

/**
 * ## Получить размер пиццы
 *
 * @param {object[]} size список размеров пиццы
 *
 * @returns {string} вернет размер пиццы или пустую строку
 */
const getSizePizza = (size) => {
  const selectedElement = getSelectedElement(size);

  return selectedElement && selectedElement.label;
}

/**
 * ## Получить тесто пиццы
 *
 * @param {object[]} dough список теста пиццы
 *
 * @returns {string} вернет тесто пиццы или пустую строку
 */
const getDoughPizza = (dough) => {
  const selectedElement = getSelectedElement(dough);

  return selectedElement && `на ${DOUGH[selectedElement.value]} тесте`;
}

/**
 * ## Получить размер и тесто пиццы
 *
 * @param {object[]} size список размеров пиццы
 * @param {object[]} dough список теста пиццы
 *
 * @returns {JSX.Element} вернет размер и тесто пиццы
 */
const renderSizeAndDoughPizza = (size, dough) => {
  return <div>{ getSizePizza(size) } { getDoughPizza(dough) }</div>
}

/**
 * ## Получить соус пиццы
 *
 * @param {object[]} sauce список соусов пиццы
 *
 * @returns {JSX.Element | string} вернет соус пиццы или пустую строку
 */
const renderSaucePizza = (sauce) => {
  const selectedElement = getSelectedElement(sauce);

  return selectedElement && <li>{ selectedElement.value } соус</li>
}

/**
 * ## Получить ингредиенты пиццы
 *
 * @param {object[]} ingredients список ингредиентов пиццы
 *
 * @returns {JSX.Element[]} вернет список ингредиентов пиццы или пустой массив
 */
const renderIngredientsPizza = (ingredients) => {
  const currentIngredients = Object.values(ingredients).flat();

  if (!currentIngredients.length) {
    return [];
  }

  return currentIngredients.reduce((acc, ingredient) => {
    if (ingredient.selected) {
      acc.push(<li key={ingredient.value}>{ingredient.value}</li>);
    }

    return acc;
  }, []);
}

/**
 * ## Получить состав пиццы
 *
 * @param {object} statePizza состава пиццы
 *
 * @returns {JSX.Element} вернет состав пиццы
 */
export const renderPizzaComposition = ({
  size,
  dough,
  sauce,
  ...ingredients
}) => {

  return (
    <>
      {renderSizeAndDoughPizza(size, dough)}
      <ul data-testid="ingredients">
        {renderSaucePizza(sauce)}
        {renderIngredientsPizza(ingredients)}
      </ul>
    </>
  )
}

/**
 * ## Получить тип ингрединта
 *
 * @param {} appStatePizza стей ингрединтов
 * @param {object} ingredientType тип ингредиента
 *
 * @returns {object[]} список ингредиенты
 */
export const getIngredientsAppStatePizza = (
  appStatePizza,
  ingredientType
) => {
  return appStatePizza && appStatePizza[ingredientType];
}