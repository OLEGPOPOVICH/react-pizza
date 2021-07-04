/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { deleteIngredient, getIngredients, updateIngredient } from "../../api";
import { filterByGroupToppings } from "./utils";
import { Ingredient } from "./Ingredient/Ingredient";
import { IngredientEditForm } from "./IngredientEditForm/IngredientEditForm";
import { Modal } from "../../component/Modal/Modal";
import { Portal } from "../../component/Portal/Portal";
import "./styles.css";

export const IngredientsPage = () => {
  const [isLoading, setIsloading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientEdit, setIngredientEdit] = useState({});
  const [ingredientQuery, setIngredientQuery] = useState({
    ingredient: {},
    ingredientId: null,
    delete: false,
    update: false
  });

  const { isError, error } = useQuery("ingredients", getIngredients, {
    onSuccess: ({data}) => {
      const toppings = filterByGroupToppings(data);

      setIngredients(toppings);
      setIsloading(false);
    }
  });

  const deleteQuery = useQuery("deleteIngredient", () => deleteIngredient(ingredientQuery.ingredientId), {
    enabled: ingredientQuery.delete,
    retry: false,
    onSuccess: () => {
      setIngredientQuery({
        ...ingredientQuery,
        delete: false,
        ingredientId: null
      });
    }
  });

  const updateQuery = useQuery("updateIngredient", () => updateIngredient(ingredientQuery.ingredientId, ingredientQuery.ingredient), {
    enabled: ingredientQuery.update,
    retry: false,
    onSuccess: (data) => {
      setIngredientQuery({
        ...ingredientQuery,
        ingredient: {},
        update: false,
        ingredientId: null
      });

      setIngredients({
        ...ingredients,
        [data.category]: ingredients[data.category].map((ingredient) => {
          if (ingredient.id === data.id) {
            ingredient = data;
          }

          return ingredient
        })
      });
    }
  });

  const handleDeleteClick = useCallback((ingredient) => {
    const ok = window.confirm(`Вы точно хотите удалить ${ingredient.category} ${ingredient.value}?`);
    if (ok) {
      setIngredientQuery({
        ...ingredientQuery,
        delete: true,
        ingredientId: ingredient.id
      });
    }
  }, []);

  const handleEditClick = useCallback((ingredient) => {
    setIngredientEdit(ingredient);
    setIsEdit(true);
  }, []);

  const handleCloseClick = useCallback(() => {
    setIngredientEdit({});
    setIsEdit(false);
  }, []);

  const handleSaveClick = useCallback((data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "thumbnail" || key === "image") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    setIngredientQuery({
      ...ingredientQuery,
      ingredient: formData,
      update: true,
      ingredientId: formData.get('id')
    });
    setIsEdit(false);
  }, []);

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <h1>Список топпингов</h1>
      <div className="ingredients__category">
        <div className="ingredient__category">
          <h2>Тесто</h2>
        </div>
        <div className="ingredients">
          {ingredients.dough.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient.id}
                ingredient={ingredient}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            )
          })}
        </div>
        <div className="ingredient__category">
          <h2>Размер</h2>
        </div>
        <div className="ingredients">
          {ingredients.size.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient.id}
                ingredient={ingredient}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            )
          })}
        </div>
        <div className="ingredient__category">
          <h2>Мясо</h2>
        </div>
        <div className="ingredients">
          {ingredients.meat.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient.id}
                ingredient={ingredient}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            )
          })}
        </div>
        <div className="ingredient__category">
          <h2>Овощи</h2>
        </div>
        <div className="ingredients">
          {ingredients.vegetables.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient.id}
                ingredient={ingredient}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            )
          })}
        </div>
        <div className="ingredient__category">
          <h2>Сыр</h2>
        </div>
        <div className="ingredients">
          {ingredients.cheese.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient.id}
                ingredient={ingredient}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            )
          })}
        </div>
        <div className="ingredient__category">
          <h2>Соусы</h2>
        </div>
        <div className="ingredients">
          {ingredients.sauce.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient.id}
                ingredient={ingredient}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            )
          })}
        </div>
      </div>
      <Portal>
        <Modal
          showModal={isEdit}
          title={`Редактирование`}
          actionClose={handleCloseClick}
          action={{formID: "edit", name: "Сохранить"}}
        >
          <IngredientEditForm
            id="edit"
            ingredient={ingredientEdit}
            onClickSave={handleSaveClick}
          />
        </Modal>
      </Portal>
    </>
  );
}