/* eslint-disable prettier/prettier */
import { createElement } from 'react';
import { getRandomString } from 'common/utils/index';
import { DOUGH } from './constants';

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
 * @param {object[]} size список размеров пиццы
 * @returns {string} вернет размер пиццы или пустую строку
 */
export const getSizePizza = (size) => {
  const selectedElement = getSelectedElement(size);

  return selectedElement.length ? selectedElement[0].label : '';
};

/**
 * ## Получить тесто пиццы
 *
 * @param {object[]} dough список теста пиццы
 * @returns {string} вернет тесто пиццы или пустую строку
 */
export const getDoughPizza = (dough, oprtions = {}) => {
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
 * @param {object[]} sauce список соусов пиццы
 * @returns {string} вернет соус пиццы или пустую строку
 */

export const getSaucePizza = (sauce) => {
  const selectedElement = getSelectedElement(sauce);

  return selectedElement.length ? selectedElement[0].value : '';
};

/**
 * ## Получить ингредиенты пиццы
 *
 * @param {object[]} ingredients список ингредиентов пиццы
 * @returns {JSX.Element[]} вернет список ингредиентов пиццы или пустой массив
 */
export const getIngredientsPizza = (ingredients = {}, oprtions = {}) => {
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

/**
 * ## Получить итогувую сумму пиццы
 *
 * @param {object} pizzaData состав пиццы
 * @returns {number} вернет итогую сумму пиццы
 */
export const getTotalPrice = (pizzaData = {}) => {
  const pizzaDataList = Object.values(pizzaData).flat();

  return pizzaDataList.reduce((acc, pizza) => (acc += pizza.checked ? +pizza.price : 0), 0);
};