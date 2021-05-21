/* eslint-disable prettier/prettier */
import { Router } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import { App } from 'App';
import { AppStateProvider } from 'useAppStateContext';
import { createMemoryHistory } from 'history';

const renderWithRouter = (
  component,
  {
    route = "/",
    history = createMemoryHistory({initialEntries: [route]})
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Router history={history}>{ children }</Router>
  );

  return {
    ...render(component, { wrapper: Wrapper }),
    history
  };
}

describe('App', () => {
  it('render the constructor page', async () => {
    const { findByText } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    expect(await findByText('Собери свою пиццу'));
  });

  it('click on the auth link', () => {
    const { getByRole } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Авторизация'));

    expect(getByRole('heading').innerHTML).toMatch('Авторизация');
    expect(getByRole('button').innerHTML).toMatch('Авторизоваться');
  });

  it('click on the registration link from the auth page', () => {
    const { getByRole, container } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Авторизация'));
    fireEvent.click(getByText(container, 'Зарегистрироваться'));

    expect(getByRole('heading').innerHTML).toMatch('Регистрация');
    expect(getByRole('button').innerHTML).toMatch('Зарегистрироваться');
  });

  it('click on the auth link from the registration page', () => {
    const { getByRole, container } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Авторизация'));
    fireEvent.click(getByText(container, 'Зарегистрироваться'));
    fireEvent.click(getByText(container, 'Авторизоваться'));

    expect(getByRole('heading').innerHTML).toMatch('Авторизация');
    expect(getByRole('button').innerHTML).toMatch('Авторизоваться');
  });

  it('click on the order link', () => {
    const { getByRole } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Оформление заказа'));

    expect(getByRole('heading', { name: 'Оформление заказа' }).innerHTML);
  });

  it('click on the orders link', () => {
    const { getByRole } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Заказы'));

    expect(getByRole('heading', { name: 'Заказы' }).innerHTML);
  });

  it('click on the check link', () => {
    const { getByRole } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Чек'));

    expect(getByRole('heading', { name: 'Страница с чеком' }).innerHTML);
  });

  it('go to 404 page', () => {
    const { getByRole } = renderWithRouter(
      <AppStateProvider>
        <App />
      </AppStateProvider>,
      { route: '/404-page' }
    );

    expect(getByRole('heading').innerHTML).toMatch('404 Not Found Page');
  });
});
