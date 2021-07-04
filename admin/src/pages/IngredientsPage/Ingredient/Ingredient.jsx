import { memo } from "react";
import "./styles.css";

export const Ingredient = memo(({
  ingredient,
  onDelete,
  onEdit,
}) => (
  <div className="ingredient">
    <div className="ingredient__img">
      <img src={`/images/${ingredient.thumbnail || 'not-image.png'}`} alt={ingredient.value} />
    </div>
    <div className="ingredient__content">
      <div className="ingredient__title">
        <strong>{ingredient.value}</strong>
        <div>
          <button className="btn btn__edit" onClick={() => onEdit(ingredient)}>edit</button>
          <button className="btn btn__delete" onClick={() => onDelete(ingredient)}>delete</button>
        </div>
      </div>
      <div>Цена: {ingredient.price} руб
      </div>
      <div>Категория: {ingredient.category}
      </div>
      <div>Слаг: {ingredient.slug}
      </div>
      <div>По умолнчанию: {ingredient.checked ? "Да" : "Нет"}</div>
    </div>
  </div>
));