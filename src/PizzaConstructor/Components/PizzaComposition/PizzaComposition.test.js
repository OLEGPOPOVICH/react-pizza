import {
  getByTestId,
  getByText,
  render
} from "@testing-library/react";
import { AppStateProvider } from "../../../useAppStateContext/useAppStateContext";
import { PizzaConstructor } from "../../PizzaConstructor";

describe('PizzaComposition',  () => {
  it('renders', () => {

    const {container} = render(
      <AppStateProvider>
        <PizzaConstructor />
      </AppStateProvider>
    );

    expect(getByText(container, 'Твоя пицца'));
    expect(getByText(container, '30 см на тонком тесте'));
    expect(getByText(getByTestId(container, 'ingredients'), 'Томатный соус'));
    expect(getByText(getByTestId(container, 'ingredients'), 'Моцарелла'));
    expect(getByText(getByTestId(container, 'ingredients'), 'Томаты'));
  });
})