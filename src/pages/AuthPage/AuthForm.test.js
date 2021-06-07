import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { AuthForm } from "./AuthForm";

const useAuthForm = () => {
  const formSubmit = jest.fn().mockImplementation((data) => data);
  const renderForm = render(
    <MemoryRouter>
      <AuthForm formSubmit={formSubmit} />
    </MemoryRouter>
  );

  const inputLogin = renderForm.getByTestId("login");
  const inputPassword = renderForm.getByTestId("password");

  return {
    formSubmit,
    inputLogin,
    inputPassword,
    ...renderForm,
  };
};

describe("AuthForm", () => {
  it("authorization process", async () => {
    const { inputLogin, inputPassword, getByText, formSubmit } = useAuthForm();

    fireEvent.input(inputLogin, { target: { value: "testLogin" } });
    fireEvent.input(inputPassword, { target: { value: "123456" } });

    await act(async () => {
      fireEvent.click(getByText("Авторизоваться"));
    });

    expect(formSubmit).toBeCalledWith({
      login: "testLogin",
      password: "123456",
    });
  });

  describe("on submit", () => {
    it("display a message about the mandatory filling of the login and password fields", async () => {
      const { getByText } = useAuthForm();

      await act(async () => {
        fireEvent.click(getByText("Авторизоваться"));
      });

      expect(getByText("Логин обязательное поле")).toBeInTheDocument();
      expect(getByText("Пароль обязательное поле")).toBeInTheDocument();
    });
  });

  describe("on change", () => {
    it("display a message about the minimum number of characters for the login and password fields", async () => {
      const { inputLogin, inputPassword, getByText } = useAuthForm();

      fireEvent.input(inputLogin, { target: { value: "test" } });
      fireEvent.input(inputPassword, { target: { value: "123" } });

      await act(async () => {
        fireEvent.click(getByText("Авторизоваться"));
      });

      expect(getByText("Логин должен быть не меньше 5 символов")).toBeInTheDocument();
      expect(getByText("Пароль должен быть не меньше 5 символов")).toBeInTheDocument();
    });

    it("display a message about the maxsimum number of characters for the login and password fields", async () => {
      const { inputLogin, inputPassword, getByText } = useAuthForm();

      fireEvent.input(inputLogin, { target: { value: "testLogin12345" } });
      fireEvent.input(inputPassword, { target: { value: "1234567891011" } });

      await act(async () => {
        fireEvent.click(getByText("Авторизоваться"));
      });

      expect(getByText("Логин должен быть не больше 10 символов")).toBeInTheDocument();
      expect(getByText("Пароль должен быть не больше 10 символов")).toBeInTheDocument();
    });

    it("display a message about incorrect password entry", async () => {
      const { inputPassword, getByText } = useAuthForm();

      fireEvent.input(inputPassword, { target: { value: "пароль" } });

      await act(async () => {
        fireEvent.click(getByText("Авторизоваться"));
      });

      expect(getByText("Пароль некорректный, пароль может содержать только латинские буквы и цифры!")).toBeInTheDocument();
    });
  });
});
