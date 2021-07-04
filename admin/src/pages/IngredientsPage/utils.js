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