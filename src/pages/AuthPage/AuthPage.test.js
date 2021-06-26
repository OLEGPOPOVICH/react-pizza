import { render, fireEvent, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { localSt } from "common/utils/localStorage";
import { auth } from "api";
import { AppStateProvider } from "AppStateContext";
import { AuthPage } from "./AuthPage";

jest.mock("../../api", () => ({
  auth: jest.fn(),
}));

const getControlledPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  auth.mockImplementation(() => promise);

  return { resolve, reject };
};
const queryClient = new QueryClient();

const useAuthPage = () => {
  const authPage = render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AppStateProvider>
          <AuthPage />
        </AppStateProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  const inputEmail = authPage.getByTestId("email");
  const inputPassword = authPage.getByTestId("password");

  return { ...authPage, inputEmail, inputPassword };
};

describe("AuthPage", () => {
  it("rendres page", () => {
    const { getByRole, getByText } = useAuthPage();

    expect(getByRole("heading")).toHaveTextContent("Авторизация");
    expect(getByText("E-mail")).toBeInTheDocument();
    expect(getByText("Пароль")).toBeInTheDocument();
    expect(getByRole("link", { name: "Зарегистрироваться" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Авторизоваться" })).toBeInTheDocument();
  });

  describe("authorization process", () => {
    it("with invalid fields email and password", async () => {
      const { reject } = getControlledPromise();
      reject({ message: "Wrong email or password" });

      const { inputEmail, inputPassword, getByText } = useAuthPage();

      fireEvent.input(inputEmail, { target: { value: "test@test.com" } });
      fireEvent.input(inputPassword, { target: { value: "123456" } });

      await act(async () => {
        fireEvent.click(getByText("Авторизоваться"));
      });

      expect(getByText("Wrong email or password")).toBeInTheDocument();
    });

    it("with valid fields email and password", async () => {
      const { resolve } = getControlledPromise();
      resolve({ data: { token: "123456789" } });

      const { inputEmail, inputPassword, getByText } = useAuthPage();

      fireEvent.input(inputEmail, { target: { value: "example@email.com" } });
      fireEvent.input(inputPassword, { target: { value: "password" } });

      await act(async () => {
        fireEvent.click(getByText("Авторизоваться"));
      });

      const dataLS = localSt.getItem("token");

      expect(dataLS).toBe(123456789);
    });
  });
});
