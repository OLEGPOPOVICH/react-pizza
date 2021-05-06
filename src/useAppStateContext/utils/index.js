export const getTotalPricePizza = (appStatePizza) => {
  let ingredients = Object.values(appStatePizza);

  return ingredients
    .flat()
    .reduce((acc, ingredient) => {
      return acc += ingredient.selected ? +ingredient.price : 0;
    }, 0);
}

