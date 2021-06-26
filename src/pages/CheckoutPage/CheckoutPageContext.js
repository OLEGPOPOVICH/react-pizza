/* eslint-disable prettier/prettier */
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkFormCompleted } from "./utils";

const schema = Yup.object().shape({
  address: Yup.string()
    .required("Обязательное поле")
    .min(2, "Адрес должен быть не меньше 2 символов"),
  entrance: Yup.string()
    .required("Обязательное поле")
    .matches(/^[0-9]{1,}$/, "Пароль некорректный, пароль может содержать только цифры!"),
  floor: Yup.string()
    .required("Обязательное поле")
    .matches(/^[0-9]{1,}$/, "Пароль некорректный, пароль может содержать только цифры!"),
  flat: Yup.string()
    .required("Обязательное поле")
    .matches(/^[0-9]{1,}$/, "Пароль некорректный, пароль может содержать только цифры!"),
  cardNumber: Yup.string()
    .required("Обязательное поле")
    .min(19, "Номер карты должен содержать 16 цифр!"),
  cardExpiryDate: Yup.string()
    .required("Обязательное поле")
    .matches(/(0[1-9]|1[0-2])\/[0-9]{2}/, "Некорректная дата"),
  codeCVV: Yup.string()
    .required("Обязательное поле"),
  cardowner: Yup.string()
    .required("Обязательное поле")
    .matches(/^[a-zA-Zа-яёА-ЯЁ\s]{1,}$/, "Поле может содержать только буквы русского или латинского алфавитов"),
});

const CheckoutPageContext = createContext();

export const CheckoutPageProvider = ({ children }) => {
  const { formState, getValues, ...other } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  const isFormCompleted = checkFormCompleted(formState.errors, getValues());

  return (
    <CheckoutPageContext.Provider
      value={{
        formState,
        getValues,
        ...other,
        isFormCompleted
      }}
    >
      {children}
    </CheckoutPageContext.Provider>
  );
};

export const useCheckoutPageContext = () => useContext(CheckoutPageContext);
