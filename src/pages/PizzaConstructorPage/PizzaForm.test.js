import { getByTestId, getByText, render, waitFor } from "@testing-library/react";
import { fireEvent, getByDisplayValue, queryByText } from "@testing-library/dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppStateProvider } from "../../AppStateContext";
import { PizzaConstructorPage } from "./index";
import { dataTest } from "./dataTest";
import { getTopping } from "api";

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

describe("PizzaForm", () => {
  it("selection of ingredients", async () => {
    const { resolve } = getControlledPromise();
    resolve(dataTest);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <AppStateProvider>
          <PizzaConstructorPage />
        </AppStateProvider>
      </QueryClientProvider>
    );

    fireEvent.click(await waitFor(() => getByDisplayValue(container, "35"), { container }));
    fireEvent.click(getByDisplayValue(container, "Пышное"));
    fireEvent.click(getByDisplayValue(container, "Острый"));
    fireEvent.click(getByDisplayValue(container, "Чеддер"));
    fireEvent.click(getByDisplayValue(container, "Томаты"));
    fireEvent.click(getByDisplayValue(container, "Перец"));
    fireEvent.click(getByDisplayValue(container, "Пепперони"));

    expect(getByText(container, "35 cм на пышном тесте"));
    const ingredients = getByTestId(container, "ingredients");
    expect(getByText(ingredients, "Острый"));
    expect(queryByText(ingredients, "Чеддер")).toBeNull();
    expect(queryByText(ingredients, "Томаты")).toBeNull();
    expect(getByText(ingredients, "Брокколи"));
    expect(getByText(ingredients, "Перец"));
    expect(getByText(ingredients, "Пепперони"));
    expect(getByText(ingredients, "Бекон"));
    expect(getByText(ingredients, "Курица"));

    const buttonOrder = getByTestId(container, "btn-order");
    expect(getByText(buttonOrder, "Заказать за 742 руб"));
  });
});
