import { getByTestId, getByText, getByDisplayValue, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppStateProvider } from "../../AppStateContext";
import { PizzaConstructorPage } from ".";
import { getTopping } from "api";
import { dataTest } from "./dataTest";

jest.mock("../../api", () => ({
  getTopping: jest.fn(),
}));

const getControlledPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  getTopping.mockImplementation(() => promise);

  return { resolve, reject };
};

const queryClient = new QueryClient();

describe("PizzaConstructorPage", () => {
  it("renders", async () => {
    const { resolve } = getControlledPromise();
    resolve(dataTest);

    const { container, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <AppStateProvider>
          <PizzaConstructorPage />
        </AppStateProvider>
      </QueryClientProvider>
    );

    expect(await findByText("30 cм на тонком тесте"));
    expect(getByText(getByTestId(container, "ingredients"), "Томатный"));
    expect(getByText(getByTestId(container, "ingredients"), "Бекон"));
    expect(getByText(getByTestId(container, "ingredients"), "Курица"));
    expect(getByText(getByTestId(container, "ingredients"), "Томаты"));
    expect(getByText(getByTestId(container, "ingredients"), "Чеддер"));

    expect(getByDisplayValue(container, "30")).toBeChecked();
    expect(getByDisplayValue(container, "35")).not.toBeChecked();

    expect(getByDisplayValue(container, "Тонкое")).toBeChecked();
    expect(getByDisplayValue(container, "Пышное")).not.toBeChecked();

    expect(getByDisplayValue(container, "Томатный")).toBeChecked();
    expect(getByDisplayValue(container, "Майонез")).not.toBeChecked();

    expect(getByDisplayValue(container, "Чеддер")).toBeChecked();

    expect(getByDisplayValue(container, "Томаты")).toBeChecked();
    expect(getByDisplayValue(container, "Брокколи")).toBeChecked();

    expect(getByDisplayValue(container, "Бекон")).toBeChecked();
    expect(getByDisplayValue(container, "Курица")).toBeChecked();

    expect(getByText(getByTestId(container, "btn-order"), "Заказать за 642 руб"));
  });
});
