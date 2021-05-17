/* eslint-disable prettier/prettier */
import { createElement } from 'react';
import { getRandomString } from '../../../../common/utils/strings';

export const usePizzaSammary = (pizzaData = {}) => {
  const { size, dough, sauce, ...ingredients } = pizzaData;

  const DOUGH = {
    Тонкое: 'тонком',
    Пышное: 'пышном',
  };

  /**
   * ## Получить выбранай элемент из списка
   *
   * @param {object[]} elements список элементов
   *
   * @returns {array} вернет выбранный элемент или пустой массив
   */
  const getSelectedElement = (elements) =>
    Array.isArray(elements)
      ? elements.filter((element) => element.checked)
      : [];

  /**
   * ## Получить размер пиццы
   *
   * @returns {string} вернет размер пиццы или пустую строку
   */
  const getSizePizza = () => {
    const selectedElement = getSelectedElement(size);

    return selectedElement.length ? selectedElement[0].label : '';
  };

  /**
   * ## Получить тесто пиццы
   *
   * @returns {string} вернет тесто пиццы или пустую строку
   */
  const getDoughPizza = (oprtions = {}) => {
    const { declText } = oprtions;
    const selectedElement = getSelectedElement(dough);

    if (!selectedElement.length) {
      return '';
    }

    const doughValue = selectedElement[0].value;

    return declText ? DOUGH[doughValue] : doughValue;
  };

  /**
   * ## Получить соус пиццы
   *
   * @returns {string} вернет соус пиццы или пустую строку
   */

  const getSaucePizza = () => {
    const selectedElement = getSelectedElement(sauce);

    return selectedElement.length ? selectedElement[0].value : '';
  };

  /**
   * ## Получить ингредиенты пиццы
   *
   * @returns {JSX.Element[]} вернет список ингредиентов пиццы или пустой массив
   */
  const getIngredientsPizza = (oprtions = {}) => {
    const { htmlWrap } = oprtions;
    const currentIngredients = Object.values(ingredients).flat();

    if (!currentIngredients.length) {
      return [];
    }

    const wrapText = (text) => {
      if (!htmlWrap) {
        return text;
      }

      return createElement(htmlWrap, { key: getRandomString() }, text);
    };

    return currentIngredients.reduce((acc, ingredient) => {
      if (ingredient.checked) {
        acc.push(wrapText(ingredient.value));
      }

      return acc;
    }, []);
  };

  return {
    pizzaData,
    getSizePizza,
    getDoughPizza,
    getSaucePizza,
    getIngredientsPizza,
  };
};
