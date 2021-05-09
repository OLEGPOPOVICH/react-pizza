import {
  getByLabelText,
  getByTestId,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import { AppStateProvider } from '../../../useAppStateContext/useAppStateContext';
import { PizzaConstructor } from '../../PizzaConstructor';

describe('PizzaForm', () => {
  it('renders', () => {
    const { container } = render(
      <AppStateProvider>
        <PizzaConstructor />
      </AppStateProvider>
    );

    // expect(getByLabelText(container, '30 см')).toBeChecked();
    // expect(getByLabelText(container, 'Тонкое')).toBeChecked();
    // expect(getByLabelText(container, 'Томатный')).toBeChecked();
    // expect(getByLabelText(container, 'Грибной')).not.toBeChecked();
    // expect(screen.getByDisplayValue('Моцарелла')).toBeChecked();
    // expect(screen.getByDisplayValue('Томаты')).toBeChecked();
    // expect(screen.getByDisplayValue('Пепперони')).not.toBeChecked();

    // expect(getByText(getByTestId(container, 'btn-order'), 'Заказать за 200 руб'));
  });
});
