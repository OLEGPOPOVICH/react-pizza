/* eslint-disable arrow-body-style */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/v2/",
});

export const auth = (authData) => {
  return api
    .post("admin-auth/login", authData)
    .then((response) => {
      if (typeof response.data === "string") {
        throw new Error(response.data);
      }

      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getTopping = () => {
  return api
    .get("ingredients")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const createOrder = (order) => {
  return api
    .post("orders")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getOrders = () => {
  return api
    .get("orders")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
