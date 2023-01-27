import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

// beforeAll(() => jest.spyOn(window, 'fetch'));
beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ result: { meals: [], drinks: [] } }),
  });
  global.alert = jest.fn();
  const PAGEROUTE = '/meals';
  const SEARCHBTNID = 'search-top-btn';
  renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

  const searchBtn = screen.getByTestId(SEARCHBTNID);
  userEvent.click(searchBtn);
});

const FETCHURLINGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
const FETCHURLNAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken karaage';
const FETCHURLFIRSTLETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=C';

describe('Tests of the Header - searchbar functionalities', () => {
  const RADIOINGREDIENT = 'ingredient-search-radio';
  const RADIONAME = 'name-search-radio';
  const RADIOFIRSTNAME = 'first-letter-search-radio';

  test('The presence of key components', () => {
    const radioIngredient = screen.getByTestId(RADIOINGREDIENT);
    const radioMame = screen.getByTestId(RADIONAME);
    const radioFirstName = screen.getByTestId(RADIOFIRSTNAME);
    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    const searchBox = screen.getByRole('searchbox');

    expect(searchBox).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioMame).toBeInTheDocument();
    expect(radioFirstName).toBeInTheDocument();
    expect(searchBarBtn).toBeInTheDocument();
  });
});

describe('Testing the Search API for meals - By Ingredient', () => {
  const RADIOINGREDIENT = 'ingredient-search-radio';
  test('Search recipes by ingredient', async () => {
    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'chicken');
    expect(searchBox.value).toBe('chicken');

    const radioIngredient = screen.getByTestId(RADIOINGREDIENT);
    userEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarBtn);

    await waitFor(async () => {
      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch).toHaveBeenCalledWith(FETCHURLINGREDIENT);
    });
  });
});

describe('Testing the Search API for meals - By Name', () => {
  const RADIONAME = 'name-search-radio';
  test('Search recipes by name', async () => {
    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'chicken karaage');
    expect(searchBox.value).toBe('chicken karaage');

    const radioName = screen.getByTestId(RADIONAME);
    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarBtn);

    await waitFor(async () => {
      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch).toHaveBeenCalledWith(FETCHURLNAME);
    });
  });
});

describe('Testing the Search API for meals - By First Letter', () => {
  const RADIOFIRSTLETTER = 'first-letter-search-radio';
  test('Search recipes by name', async () => {
    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'C');
    expect(searchBox.value).toBe('C');

    const radioFirstLetter = screen.getByTestId(RADIOFIRSTLETTER);
    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarBtn);

    await waitFor(async () => {
      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch).toHaveBeenCalledWith(FETCHURLFIRSTLETTER);
    });
  });
  test('Search recipes by name - Alert for more than one letter', async () => {
    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'xablau');
    expect(searchBox.value).toBe('xablau');

    const radioFirstLetter = screen.getByTestId(RADIOFIRSTLETTER);
    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarBtn);

    await waitFor(async () => {
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });
});
