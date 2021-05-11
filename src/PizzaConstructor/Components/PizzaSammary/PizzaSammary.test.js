/* eslint-disable prettier/prettier */
import { getByTestId, getByText, render, waitFor } from '@testing-library/react';
import { fireEvent, getByDisplayValue, queryByText } from '@testing-library/dom';
import App from 'App';
import { AppStateProvider } from '../../../useAppStateContext/useAppStateContext';

describe('PizzaSammary', () => {
  it('renders', async () => {
    const { container } = render(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    fireEvent.click(await waitFor(
      () => getByDisplayValue(container, '35'),
      { container }
    ));
    fireEvent.click(getByDisplayValue(container, 'Пышное'));
    fireEvent.click(getByDisplayValue(container, 'Острый'));
    fireEvent.click(getByDisplayValue(container, 'Чеддер'));
    fireEvent.click(getByDisplayValue(container, 'Томаты'));
    fireEvent.click(getByDisplayValue(container, 'Перец'));
    fireEvent.click(getByDisplayValue(container, 'Пепперони'));

    expect(getByText(container, '35 см на пышном тесте'));
    const ingredients = getByTestId(container, 'ingredients');
    expect(getByText(ingredients, 'Острый соус'));
    expect(getByText(ingredients, 'Моцарелла'));
    expect(getByText(ingredients, 'Чеддер'));
    expect(queryByText(ingredients, 'Томаты')).toBeNull();
    expect(getByText(ingredients, 'Перец'));
    expect(getByText(ingredients, 'Пепперони'));

    expect(getByText(getByTestId(container, 'btn-order'), 'Заказать за 358 руб'));
  });
});
