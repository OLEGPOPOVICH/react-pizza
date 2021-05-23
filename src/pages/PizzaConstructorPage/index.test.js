/* eslint-disable prettier/prettier */
import {
  getByTestId,
  getByText,
  getByDisplayValue,
  render,
} from '@testing-library/react';
import { AppStateProvider } from '../../useAppStateContext';
import { PizzaConstructorPage } from '.';

describe('PizzaConstructorPage', () => {
  it('renders', async () => {

    const { container, findByText } = render(
      <AppStateProvider>
        <PizzaConstructorPage />
      </AppStateProvider>
    );

    expect(await findByText('30 см на тонком тесте'));
    expect(getByText(getByTestId(container, 'ingredients'), 'Томатный соус'));
    expect(getByText(getByTestId(container, 'ingredients'), 'Моцарелла'));
    expect(getByText(getByTestId(container, 'ingredients'), 'Томаты'));

    expect(getByDisplayValue(container, '30')).toBeChecked();
    expect(getByDisplayValue(container, '35')).not.toBeChecked();

    expect(getByDisplayValue(container, 'Тонкое')).toBeChecked();
    expect(getByDisplayValue(container, 'Пышное')).not.toBeChecked();

    expect(getByDisplayValue(container, 'Моцарелла')).toBeChecked();
    expect(getByDisplayValue(container, 'Чеддер')).not.toBeChecked();

    expect(getByDisplayValue(container, 'Томаты')).toBeChecked();
    expect(getByDisplayValue(container, 'Грибы')).not.toBeChecked();

    expect(getByDisplayValue(container, 'Бекон')).not.toBeChecked();

    expect(getByText(getByTestId(container, 'btn-order'), 'Заказать за 200 руб'));
  });
});
