import { useReducer } from 'react';

const getNewArray = ({ list, currentItem }) =>
  list.map((item) => {
    if (item.value === currentItem.value) {
      item.checked = currentItem.checked;
    } else if (item.checked && currentItem.buttonType === 'radio') {
      item.checked = false;
    }

    return item;
  });

const reducer = (appState = {}, action) => {
  const { pizzaData } = appState;

  if (pizzaData[action.type]) {
    return {
      ...appState,
      [pizzaData[action.type]]: getNewArray({
        list: [...pizzaData[action.type]],
        currentItem: action.payload,
      }),
    };
  }

  return appState;
};

export const usePizzaConstructor = (appState) => {
  const [state, dispatch] = useReducer(reducer, appState);

  return { pizzaData: state.pizzaData, dispatch };
};
