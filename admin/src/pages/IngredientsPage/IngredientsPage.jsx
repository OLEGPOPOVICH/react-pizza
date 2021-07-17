import { Ingredients } from "./Ingredients";
import { useIngredietsQuery } from "./ingredientsQuery";
import "./styles.css";

export const IngredientsPage = () => {
  const { isLoading, errorQuery, ingredients, updateIngredient } = useIngredietsQuery();

  if (errorQuery.isError) {
    return <div>Error: {errorQuery.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <h1>Список топпингов</h1>
      <Ingredients ingredients={ingredients} updateIngredient={updateIngredient} />
    </>
  );
}