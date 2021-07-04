import { useForm } from "react-hook-form";
import "./styles.css";

export const IngredientEditForm = ({
  ingredient,
  onClickSave,
  id
}) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    onClickSave({...ingredient, ...data})
  }

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <table className="table">
        <tbody>
          <tr>
            <td>Название:</td>
            <td>
              <input
                {...register("value")}
                type="text"
                defaultValue={ingredient.value}
              />
            </td>
          </tr>
          <tr>
            <td>Цена:</td>
            <td>
              <input
                {...register("price")}
                type="text"
                defaultValue={ingredient.price}
              />
            </td>
          </tr>
          <tr>
            <td>Категория:</td>
            <td>
              <input
                {...register("category")}
                type="text"
                defaultValue={ingredient.category}
              />
            </td>
          </tr>
          <tr>
            <td>Слаг:</td>
            <td>
              <input
                {...register("slug")}
                type="text"
                defaultValue={ingredient.slug}
              />
            </td>
          </tr>
          <tr>
            <td>По умолнчанию:</td>
            <td>
              <input
                {...register("checked")}
                type="checkbox"
                defaultChecked={ingredient.checked}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="wrap__download">
                <label>Главная фотка</label>
                <div>
                  <img src={`/images/${ingredient.thumbnail || 'not-image.png'}`} alt={ingredient.value} />
                </div>
                <input
                  {...register("thumbnail")}
                  type="file"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="wrap__download">
                <label>Доп. фотка</label>
                <div>
                  <img src={`/images/${ingredient.image || 'not-image.png'}`} alt={ingredient.value} />
                </div>
                <input
                  {...register("image")}
                  type="file"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};