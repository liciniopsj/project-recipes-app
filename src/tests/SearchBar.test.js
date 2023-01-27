import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockedValueMeals } from './helpers/MockedMeals';
import AppProvider from '../context/AppProvider';

const PAGEROUTE = '/meals';
const SEARCHBTNID = 'search-top-btn';

const mockContext = { meals: [mockedValueMeals.meals[0]], drinks: [] };
// console.log(mockContext);

beforeEach(async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  }));
  // jest.spyOn(global, 'alert');
  global.alert = jest.fn();
  await act(async () => renderWithRouter(
    <AppProvider value={ mockContext }><App /></AppProvider>,
    { initialEntries: [PAGEROUTE] },
  ));

  const searchBtn = screen.getByTestId(SEARCHBTNID);
  userEvent.click(searchBtn);
});

afterEach(() => jest.clearAllMocks());
const RADIOINGREDIENT = 'ingredient-search-radio';
const RADIONAME = 'name-search-radio';
const RADIOFIRSTLETTER = 'first-letter-search-radio';
const FETCHURLINGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
const FETCHURLNAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken karaage';
const FETCHURLFIRSTLETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=C';
const ARRABIATA = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

describe('Tests of the Header - searchbar functionalities', () => {
  test('The presence of key components', () => {
    const radioIngredient = screen.getByTestId(RADIOINGREDIENT);
    const radioMame = screen.getByTestId(RADIONAME);
    const radioFirstLetter = screen.getByTestId(RADIOFIRSTLETTER);
    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    const searchBox = screen.getByRole('searchbox');

    expect(searchBox).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioMame).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(searchBarBtn).toBeInTheDocument();
  });
});

describe('Testing the Search API for meals - By Ingredient', () => {
  test('Search recipes by ingredient', async () => {
    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'chicken');
    expect(searchBox.value).toBe('chicken');

    const radioIngredient = screen.getByTestId(RADIOINGREDIENT);
    userEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    await act(async () => userEvent.click(searchBarBtn));

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(FETCHURLINGREDIENT);
    });
  });
});

describe('Testing the Search API for meals - By Name', () => {
  test('Search recipes by name', async () => {
    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'chicken karaage');
    expect(searchBox.value).toBe('chicken karaage');

    const radioName = screen.getByTestId(RADIONAME);
    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    await act(async () => userEvent.click(searchBarBtn));

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(FETCHURLNAME);
    });
  });
});

describe('Testing the Search API for meals - By First Letter', () => {
  test('Search recipes by name', async () => {
    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'C');
    expect(searchBox.value).toBe('C');

    const radioFirstLetter = screen.getByTestId(RADIOFIRSTLETTER);
    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    await act(async () => userEvent.click(searchBarBtn));

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(FETCHURLFIRSTLETTER);
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
    await act(async () => userEvent.click(searchBarBtn));

    await waitFor(async () => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Test if app redirects to details page when result has only one result - meals', () => {
  test.only('it redirects when Arrabiata is searched', async () => {
    // const { history } = renderWithRouter(
    //   <AppProvider value={ mockContext }><App /></AppProvider>,
    //   { initialEntries: [PAGEROUTE] },
    // );

    // const searchBtn = screen.getByTestId(SEARCHBTNID);
    // userEvent.click(searchBtn);

    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'Arrabiata');
    expect(searchBox.value).toBe('Arrabiata');

    const radioName = screen.getByTestId(RADIONAME);
    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    await act(async () => userEvent.click(searchBarBtn));

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(ARRABIATA);
    });
    const recipeName = screen.findByText(/spicy arrabiata penne/i);
    await waitFor(async () => {
      // expect(history.location.pathname).toBe('/meals/52771');
      expect(recipeName).toBeInTheDocument();
    });
  });
});
