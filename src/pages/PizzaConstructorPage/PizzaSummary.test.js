import { render, waitFor, getByDisplayValue, act } from "@testing-library/react";
import { fireEvent, getByTestId, getByText, queryByText } from "@testing-library/dom";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppStateProvider } from "../../AppStateContext";
import { PizzaConstructorPage } from "./index";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const queryClient = new QueryClient();

describe("PizzaSammary", () => {
  describe("on click button order", () => {
    it("send the selected pizza", async () => {
      const { container } = render(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <AppStateProvider>
              <PizzaConstructorPage />
            </AppStateProvider>
          </QueryClientProvider>
        </MemoryRouter>
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


      await act(async () => {
        fireEvent.click(buttonOrder);
      });

      expect(mockHistoryPush).toHaveBeenCalledWith("/checkout");
    });
  });
});
