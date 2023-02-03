import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockedDefaultMeals } from './helpers/mocks/MockedDefaultMeals';
import { mockedDefaultDrinks } from './helpers/mocks/MockedDefaultDrinks';

describe('Test Meals page', () => {
  const PAGEROUTE = '/meals';
  const SWITCHROUTE = '/drinks';
  const PAGETITLE = 'Meals';
  const SWITCHPAGETITLE = 'Drinks';
  const LOADING = 'Carregando...';

  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', 'teste@teste.com'))
        .mockResolvedValue(mockedDefaultMeals),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('check the app route and title', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const pageTitle = screen.getByRole('heading', { level: 1, name: PAGETITLE });

    expect(pageTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe(PAGEROUTE);
  });

  test('if page title is correct', async () => {
    renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const pageTitle = screen.getByRole('heading', { level: 1, name: PAGETITLE });
    expect(pageTitle).toBeInTheDocument();
  });

  test('if page gets handled correctly in case the route is different', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const pageTitle = screen.queryByRole('heading', { level: 1, name: PAGETITLE });
    expect(pageTitle).toBeInTheDocument();

    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', 'teste@teste.com'))
        .mockResolvedValue(mockedDefaultDrinks),
    });

    act(() => history.push(SWITCHROUTE));

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const switchPageTitle = screen.getByRole('heading', { level: 1, name: SWITCHPAGETITLE });
    expect(pageTitle).not.toBeInTheDocument();
    expect(switchPageTitle).toBeInTheDocument();
  });

  test('if filter buttons are drawned correctly', async () => {
    renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const filterBtnAll = screen.getByRole('button', { name: 'All' });
    expect(filterBtnAll).toBeInTheDocument();
  });
});
