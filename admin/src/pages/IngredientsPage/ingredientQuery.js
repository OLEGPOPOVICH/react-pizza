import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import * as api from "../../api";

const initialStateQuery = {
  ingredient: {},
  ingredientId: null,
  delete: false,
  update: false,
}

export const useIngredietQuery = ({ updateIngredient }) => {
  const [errorQuery, setErrorQuery] = useState({isError: false, message: null});
  const [ingredientQuery, setIngredientQuery] = useState(initialStateQuery);

  useQuery("deleteIngredient", () => api.deleteIngredient(ingredientQuery.ingredientId), {
    enabled: ingredientQuery.delete,
    retry: false,
    onSuccess: () => {
      setIngredientQuery(initialStateQuery);
    },
    onError: (error) => onErrorQuery(error)
  });

  useQuery("updateIngredient", () => api.updateIngredient(ingredientQuery.ingredientId, ingredientQuery.ingredient), {
    enabled: ingredientQuery.update,
    retry: false,
    onSuccess: (data) => {
      setIngredientQuery(initialStateQuery);
      updateIngredient(data);
    },
    onError: (error) => onErrorQuery(error)
  });

  const onErrorQuery = (error) => {
    setIngredientQuery(initialStateQuery);
    setErrorQuery({
      isError: true,
      message: error.message
    });
  }

  const removeErrorQuery = useCallback(() => {
    setErrorQuery({
      isError: false,
      message: null
    });
  }, []);

  const removeIngredientQuery = useCallback((ingredientId) => {
    setIngredientQuery({
      ...ingredientQuery,
      delete: true,
      ingredientId,
    });
  }, [ingredientQuery]);

  const updateIngredientQuery = useCallback((ingredient) => {
    setIngredientQuery({
      ...ingredientQuery,
      ingredient,
      update: true,
      ingredientId: ingredient.get('id')
    });
  }, [ingredientQuery]);

  return {
    errorQuery,
    removeErrorQuery,
    removeIngredientQuery,
    updateIngredientQuery,
  }
};