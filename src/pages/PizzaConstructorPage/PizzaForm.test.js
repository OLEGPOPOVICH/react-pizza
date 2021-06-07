import { getByTestId, getByText, render, waitFor } from "@testing-library/react";
import { fireEvent, getByDisplayValue, queryByText } from "@testing-library/dom";
import { AppStateProvider } from "../../useAppStateContext";
import { PizzaConstructorPage } from "./index";

describe("PizzaForm", () => {
  it("selection of ingredients", async () => {
    const { container } = render(
      <AppStateProvider>
        <PizzaConstructorPage />
      </AppStateProvider>
    );

    fireEvent.click(await waitFor(() => getByDisplayValue(container, "35"), { container }));
    fireEvent.click(getByDisplayValue(container, "Пышное"));
    fireEvent.click(getByDisplayValue(container, "Острый соус"));
    fireEvent.click(getByDisplayValue(container, "Чеддер"));
    fireEvent.click(getByDisplayValue(container, "Томаты"));
    fireEvent.click(getByDisplayValue(container, "Перец"));
    fireEvent.click(getByDisplayValue(container, "Пепперони"));

    expect(getByText(container, "35 cм на пышном тесте"));
    const ingredients = getByTestId(container, "ingredients");
    expect(getByText(ingredients, "Острый соус"));
    expect(getByText(ingredients, "Моцарелла"));
    expect(queryByText(ingredients, "Чеддер")).toBeNull();
    expect(queryByText(ingredients, "Томаты")).toBeNull();
    expect(getByText(ingredients, "Перец"));
    expect(getByText(ingredients, "Пепперони"));

    expect(getByText(getByTestId(container, "btn-order"), "Заказать за 329 руб"));
  });
});
