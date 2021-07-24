import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_SERVER}/v2/`,
  responseType: "json"
});

export const getIngredients = () => api.get("/ingredients");

export const deleteIngredient = (id) => api.delete(`/ingredients/${id}`);

export const updateIngredient = (id, ingredient) => {
  return api.put(`/ingredients/${id}`, ingredient)
    .then((response) => {
      return response.data;
    });
};