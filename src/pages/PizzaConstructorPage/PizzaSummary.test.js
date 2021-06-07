import { render, waitFor, getByDisplayValue } from "@testing-library/react";
import { fireEvent, getByTestId, getByText, queryByText } from "@testing-library/dom";
import { MemoryRouter } from "react-router-dom";
import { AppStateProvider } from "../../useAppStateContext";
import { PizzaConstructorPage } from "./index";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("PizzaSammary", () => {
  describe("on click button order", () => {
    it("send the selected pizza", async () => {
      const { container } = render(
        <MemoryRouter>
          <AppStateProvider>
            <PizzaConstructorPage />
          </AppStateProvider>
        </MemoryRouter>
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

      const buttonOrder = getByTestId(container, "btn-order");
      expect(getByText(buttonOrder, "Заказать за 329 руб"));

      fireEvent.click(getByText(buttonOrder, "Заказать за 329 руб"));
      expect(mockHistoryPush).toHaveBeenCalledWith("/checkout");
    });
  });
});
