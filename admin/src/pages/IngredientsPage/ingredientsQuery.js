import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { getIngredients } from "../../api";
import { filterByGroupToppings } from "./utils";

export const useIngredietsQuery = () => {
  const [isLoading, setIsloading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const { isError, error } = useQuery("ingredients", getIngredients, {
    enabled: !ingredients.length,
    onSuccess: ({data}) => {
      const toppings = filterByGroupToppings(data);

      setIngredients(toppings);
      setIsloading(false);
    }
  });

  const updateIngredient = useCallback((newIngredient) => {
    setIngredients({
      ...ingredients,
      [newIngredient.category]: ingredients[newIngredient.category].map((ingredient) => {
        if (ingredient.id === newIngredient.id) {
          return newIngredient;
        }

        return ingredient
      })
    })
  }, [ingredients]);

  return {
    isLoading,
    errorQuery: {
      isError,
      message: error && error.message
    },
    ingredients,
    updateIngredient,
  }
};