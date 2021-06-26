export const filterByGroupToppings = (data) => {
  const toppings = {};

  data.forEach((topping) => {
    const { category } = topping;

    if (toppings[category]) {
      toppings[category].push(topping);
    } else {
      toppings[category] = [topping];
    }
  });

  return toppings;
};

export const getTotalPrice = (pizzaWatch, pizzaData) => {
  const valuesPizzaWatch = Object.values(pizzaWatch).flat();
  const valuesPizzaData = Object.values(pizzaData).flat();

  return valuesPizzaData.reduce((acc, data) => {
    if (valuesPizzaWatch.includes(data.value)) {
      acc += +data.price;
    }

    return acc;
  }, 0);
};

export const getDefaultValues = (pizzaData) => {
  const pizzaDataKeys = Object.keys(pizzaData);

  return pizzaDataKeys.reduce((toppingCategory, key) => {
    toppingCategory[key] = pizzaData[key]
      .filter((topping) => topping.checked)
      .reduce((toppings, topping) => {
        toppings.push(topping.value);

        return toppings;
      }, []);

    return toppingCategory;
  }, {});
};
