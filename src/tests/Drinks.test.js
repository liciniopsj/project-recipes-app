import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockedDefaultDrinks } from './helpers/mocks/MockedDefaultDrinks';
import { mockedDefaultMeals } from './helpers/mocks/MockedDefaultMeals';
import { mockedDrinksByIngredient } from './helpers/mocks/MockedDrinksSearchByIngredient';

describe('Test Drinks page', () => {
  const PAGEROUTE = '/drinks';
  const SWITCHROUTE = '/meals';
  const PAGETITLE = 'Drinks';
  const SWITCHPAGETITLE = 'Meals';
  const LOADING = 'Carregando...';
  const EMAIL = 'teste@teste.com';

  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', EMAIL))
        .mockResolvedValue(mockedDefaultDrinks),
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
      json: jest.fn().mockResolvedValue(setLocalStorage('user', EMAIL))
        .mockResolvedValue(mockedDefaultMeals),
    });

    act(() => history.push(SWITCHROUTE));

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const switchPageTitle = screen.getByRole('heading', { level: 1, name: SWITCHPAGETITLE });
    expect(pageTitle).not.toBeInTheDocument();
    expect(switchPageTitle).toBeInTheDocument();

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
  });

  test('line 33', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const pageTitle = screen.getByRole('heading', { level: 1, name: PAGETITLE });
    expect(pageTitle).toBeInTheDocument();

    const recipeCard = screen.getByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();

    await act(async () => userEvent.click(recipeCard));

    await waitFor(async () => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });

  test('if cards are drawned correctly when a search is made', async () => {
    renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const submitQueryBtn = screen.getByRole('button', { name: /submit query/i });
    expect(submitQueryBtn).toBeInTheDocument();

    await act(async () => userEvent.click(submitQueryBtn));

    const searchbox = screen.getByTestId('search-input');
    expect(searchbox).toBeInTheDocument();

    await act(async () => userEvent.type(searchbox, 'Ginger ale'));

    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', EMAIL))
        .mockResolvedValue(mockedDrinksByIngredient),
    });

    const searchBtn = screen.getByRole('button', { name: /search/i });
    await act(async () => userEvent.click(searchBtn));

    const recipeCard = screen.getByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
  });
});
