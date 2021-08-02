import { useCallback, useState } from "react";
import { IngredientCreationForm } from "./IngredientCreationForm/IngredientCreationForm";
import { createIngredient } from "../../api";
import { Modal } from "../../component/Modal/Modal";

export const CreateIngredientPage = () => {
  const [isIngredietnCreated, setIsIngredientCreated] = useState(false);
  const [error, setError] = useState({isError: false, message: null})

  const handleFormSubmit = useCallback(async (newIngredient, formRefs) => {
    try {
      await createIngredient(newIngredient);
      setIsIngredientCreated(true);

      formRefs.form.current.reset();
      formRefs.thumbnail.current.value = "";
      formRefs.image.current.value = "";
    } catch (error) {
      setError({isError: true, message: error.message})
    }
  }, []);

  const handleErrorModalClose = () => {
    setError({isError: false, message: null})
  }

  const handleModalClose = () => {
    setIsIngredientCreated(false);
  }

  return (
    <>
      <h1>Создать топпинг</h1>
      <IngredientCreationForm onSubmit={handleFormSubmit} />
      <Modal
        showModal={isIngredietnCreated}
        isTitle={false}
        onClose={handleModalClose}
      >Ингредиент создан</Modal>
      <Modal
        showModal={error.isError}
        title="Ошибка"
        onClose={handleErrorModalClose}
      >{error.message}</Modal>
    </>
  );
};
