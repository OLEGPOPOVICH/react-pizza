export const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuth: true };
    case LOGOUT:
      return { ...state, isAuth: false };
    case CREATE_NEW_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};
