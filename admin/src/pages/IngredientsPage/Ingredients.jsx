import { useCallback, useState } from "react";
import { useIngredietQuery } from "./ingredientQuery"
import { Ingredient } from "./Ingredient/Ingredient";
import { Portal } from "../../component/Portal/Portal";
import { Modal } from "../../component/Modal/Modal";
import { IngredientEditForm } from "./IngredientEditForm/IngredientEditForm";

export const Ingredients = ({
  ingredients,
  updateIngredient
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [ingredientEdit, setIngredientEdit] = useState({});
  const { errorQuery, removeErrorQuery, removeIngredientQuery, updateIngredientQuery } = useIngredietQuery({updateIngredient});

  const handleCloseErrorModal = useCallback(() => {
    removeErrorQuery();
  }, []);

  const handleRemoveClick = useCallback((ingredient) => {
    const ok = window.confirm(`Вы точно хотите удалить ${ingredient.category} ${ingredient.value}?`);
    if (ok) {
      removeIngredientQuery(ingredient.id)
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
        if (data[key][0]) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    updateIngredientQuery(formData);
    setIsEdit(false);
  }, []);

  return (
    <>
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
                onRemove={handleRemoveClick}
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
                onRemove={handleRemoveClick}
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
                onRemove={handleRemoveClick}
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
                onRemove={handleRemoveClick}
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
                onRemove={handleRemoveClick}
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
                onRemove={handleRemoveClick}
                onEdit={handleEditClick}
              />
            )
          })}
        </div>
      </div>
      <Portal>
        <Modal
          showModal={errorQuery.isError}
          title={`Ошибка`}
          onClose={handleCloseErrorModal}
        >
          Error: {errorQuery.message}
        </Modal>
      </Portal>
      <Portal>
        <Modal
          showModal={isEdit}
          title={`Редактирование`}
          onClose={handleCloseClick}
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
};