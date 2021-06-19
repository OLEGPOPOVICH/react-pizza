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
