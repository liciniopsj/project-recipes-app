import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../../App';
import { mockedDefaultMeals } from './mocks/MockedDefaultMeals';
import { mockedDefaultDrinks } from './mocks/MockedDefaultDrinks';
import { MockedDrinksCategButtons, MockedMealsCategButtons } from './mocks/MockedCategButtons';

describe('Test Recipes page', () => {
  const PAGEROUTE = '/meals';
  const SWITCHROUTE = '/drinks';
  const LOADING = 'Carregando...';

  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', 'teste@teste.com'))
        .mockResolvedValue(mockedDefaultMeals).mockResolvedValue(MockedMealsCategButtons),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('check the recipes on click Beef button', async () => {
    renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const beefCateg = screen.getByRole('button', { name: /beef/i });

    expect(beefCateg).toBeInTheDocument();

    userEvent.click(beefCateg);

    const firstCard = screen.getByTestId('0-card-img');

    expect(global.fetch).toHaveBeenCalled();
    expect(firstCard).toBeInTheDocument();

    userEvent.click(beefCateg);

    expect(firstCard).toBeInTheDocument();
  });

  test('check the recipes on click All Button', async () => {
    renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const allButton = screen.getByRole('button', { name: /all/i });

    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const firstCard = screen.getByTestId('1-card-img');

    expect(firstCard).toBeInTheDocument();
  });

  test('check the recipes on click Beef button', async () => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', 'teste@teste.com'))
        .mockResolvedValue(mockedDefaultDrinks)
        .mockResolvedValue(MockedDrinksCategButtons),
    });

    renderWithRouter(<App />, { initialEntries: [SWITCHROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const cocktailCateg = screen.getByRole('button', { name: /cocktail/i });

    expect(cocktailCateg).toBeInTheDocument();

    userEvent.click(cocktailCateg);

    const firstCard = screen.getByTestId('0-card-img');

    expect(global.fetch).toHaveBeenCalled();
    expect(firstCard).toBeInTheDocument();

    userEvent.click(cocktailCateg);

    expect(firstCard).toBeInTheDocument();
  });
});
