import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthPage } from "./AuthPage";

describe("AuthPage", () => {
  it("rendres page", () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );

    expect(getByRole("heading")).toHaveTextContent("Авторизация");
    expect(getByText("Логин")).toBeInTheDocument();
    expect(getByText("Пароль")).toBeInTheDocument();
    expect(getByRole("link", { name: "Зарегистрироваться" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Авторизоваться" })).toBeInTheDocument();
  });
});
