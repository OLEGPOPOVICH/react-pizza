import { Router } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import App from 'App';
import { AppStateProvider } from 'useAppStateContext/useAppStateContext';
import { createMemoryHistory } from '../node_modules/history';

describe('App', () => {
  it('render the constructor page', async () => {
    const history = createMemoryHistory();
    const { findByText } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    expect(await findByText('Собери свою пиццу'));
  });

  it('click on the auth link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Авторизация'));

    expect(getByRole('heading').innerHTML).toMatch('Авторизация');
    expect(getByRole('button').innerHTML).toMatch('Авторизоваться');
  });

  it('click on the registration link from the auth page', () => {
    const history = createMemoryHistory();
    const { getByRole, container } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Авторизация'));
    fireEvent.click(getByText(container, 'Зарегистрироваться'));

    expect(getByRole('heading').innerHTML).toMatch('Регистрация');
    expect(getByRole('button').innerHTML).toMatch('Зарегистрироваться');
  });

  it('click on the auth link from the registration page', () => {
    const history = createMemoryHistory();
    const { getByRole, container } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Авторизация'));
    fireEvent.click(getByText(container, 'Зарегистрироваться'));
    fireEvent.click(getByText(container, 'Авторизоваться'));

    expect(getByRole('heading').innerHTML).toMatch('Авторизация');
    expect(getByRole('button').innerHTML).toMatch('Авторизоваться');
  });

  it('click on the order link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Оформление заказа'));

    expect(getByRole('heading', { name: 'Оформление заказа' }).innerHTML);
  });

  it('click on the orders link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Заказы'));

    expect(getByRole('heading', { name: 'Заказы' }).innerHTML);
  });

  it('click on the check link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    fireEvent.click(getByText(getByRole('navigation'), 'Чек'));

    expect(getByRole('heading', { name: 'Страница с чеком' }).innerHTML);
  });

  it('go to 404 page', () => {
    const history = createMemoryHistory();
    history.push('/404-page');

    const { getByRole } = render(
      <Router history={history}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Router>
    );

    expect(getByRole('heading').innerHTML).toMatch('404 Not Found Page');
  });
});
