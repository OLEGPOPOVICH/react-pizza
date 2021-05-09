import {
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  queryByText,
  render,
  screen,
} from '@testing-library/react';
import { AppStateProvider } from '../useAppStateContext/useAppStateContext';
import { PizzaConstructor } from './PizzaConstructor';

describe('PizzaConstructor', () => {
  it('changing ingredients', () => {
    const { container } = render(
      <AppStateProvider>
        <PizzaConstructor />
      </AppStateProvider>
    );

    // fireEvent.click(getByLabelText(container, '35 см'));
    // fireEvent.click(getByLabelText(container, 'Пышное'));
    // fireEvent.click(getByLabelText(container, 'Грибной'));
    // fireEvent.click(screen.getByDisplayValue('Чеддер'));
    // fireEvent.click(screen.getByDisplayValue('Томаты'));
    // fireEvent.click(screen.getByDisplayValue('Пепперони'));

    // expect(getByText(container, '30 см на пышном тесте'));
    // expect(getByText(getByTestId(container, 'ingredients'), 'Грибной соус'));
    // expect(getByText(getByTestId(container, 'ingredients'), 'Моцарелла'));
    // expect(getByText(getByTestId(container, 'ingredients'), 'Чеддер'));
    // expect(queryByText(getByTestId(container, 'ingredients'), 'Томаты')).toBeFalsy()
    // expect(getByText(getByTestId(container, 'ingredients'), 'Пепперони'));

    // expect(getByText(getByTestId(container, 'btn-order'), 'Заказать за 329 руб'));
  });
});
