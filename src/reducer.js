const getNewArray = ({ list, currentItem }) =>
  list.map((item) => {
    if (item.value === currentItem.value) {
      item.checked = currentItem.checked;
    } else if (item.checked && currentItem.buttonType === "radio") {
      item.checked = false;
    }

    return item;
  });

export const SET_PIZZA_DATA = "SET_PIZZA_DATA";
export const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";

export const reducer = (state, action) => {
  const { pizzaData } = state;

  switch (action.type) {
    case SET_PIZZA_DATA:
      return { ...state, pizzaData: action.payload, isLoading: true };
    case CREATE_NEW_ORDER:
      return { ...state, order: action.payload };
    case UPDATE_INGREDIENT:
      return {
        ...state,
        pizzaData: {
          ...pizzaData,
          [action.payload.name]: getNewArray({
            list: [...pizzaData[action.payload.name]],
            currentItem: action.payload,
          }),
        },
      };
    default:
      return state;
  }
};
