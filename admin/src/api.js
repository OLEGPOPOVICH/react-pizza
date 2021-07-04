import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/v2/",
  responseType: "json"
});

export const getIngredients= () => {
  return api.get("/ingredients").catch((error) => {
    throw new Error(error.message);
  });
};

export const deleteIngredient= (id) => {
  return api.delete(`/ingredients/${id}`).catch((error) => {
    throw new Error(error.message);
  });
};

export const updateIngredient= (id, ingredient) => {
  return api.put(`/ingredients/${id}`, ingredient)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      throw new Error(error.message);
    });
};