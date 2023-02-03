import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockedValueMeals } from './helpers/mocks/MockedMeals';
import { mockedValueDrinks } from './helpers/mocks/MockedDrinks';
// import AppProvider from '../context/AppProvider';
// import { AppContext } from '../context/AppProvider';

// const PAGEROUTE = '/meals';
const SEARCHBTNID = 'search-top-btn';

// const mockContextMeal = { meals: [mockedValueMeals.meals[0]], drinks: [] };
// const mockNull = { drinks: [], meals: [] };
const mockCombo = {
  drinks: [mockedValueDrinks.drinks[0]], meals: [mockedValueMeals.meals[0]] };
// console.log(mockContextMeal);

beforeEach(async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockCombo),
  }));
  jest.spyOn(global, 'alert');
  // global.alert = jest.fn();
});

afterEach(() => jest.clearAllMocks());
const RADIOINGREDIENT = 'ingredient-search-radio';
const RADIONAME = 'name-search-radio';
const RADIOFIRSTLETTER = 'first-letter-search-radio';
const FETCHURLINGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
const FETCHURLNAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken karaage';
const FETCHURLFIRSTLETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=C';
const ARRABIATA = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
// const LOADING = 'Carregando...';

describe('Tests of the Header - searchbar functionalities', () => {
  test('The presence of key components', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    ));

    // await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const searchBtn = screen.getByTestId(SEARCHBTNID);
    userEvent.click(searchBtn);
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
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    ));

    // await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    const searchBtn = screen.getByTestId(SEARCHBTNID);
    userEvent.click(searchBtn);
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
      expect(global.fetch).toHaveBeenCalledTimes(5);
      expect(global.fetch).toHaveBeenCalledWith(FETCHURLINGREDIENT);
    });
  });
});

describe('Testing the Search API for meals - By Name', () => {
  test('Search recipes by name', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    ));

    // await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const searchBtn = screen.getByTestId(SEARCHBTNID);
    userEvent.click(searchBtn);
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
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    ));

    // await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const searchBtn = screen.getByTestId(SEARCHBTNID);
    userEvent.click(searchBtn);
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
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    ));

    // await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const searchBtn = screen.getByTestId(SEARCHBTNID);
    userEvent.click(searchBtn);
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
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
});

describe('Test if app redirects to details page when result has only one result - meals', () => {
  test('it redirects when Arrabiata is searched', async () => {
    renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    const searchBtn = screen.getByTestId(SEARCHBTNID);
    userEvent.click(searchBtn);

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
    const recipeName = await screen.findAllByText(/spicy arrabiata penne/i);
    expect(recipeName[0]).toBeInTheDocument();
  });
});

describe('Test if app redirects to details page when result has only one result - drinks', () => {
  test('it redirects when Blue Margarita is searched', async () => {
    renderWithRouter(
      <App />,
      { initialEntries: ['/drinks'] },
    );

    const searchBtn = await screen.findByTestId(SEARCHBTNID);
    userEvent.click(searchBtn);

    const searchBox = screen.getByRole('searchbox');

    userEvent.type(searchBox, 'Blue Margarita');
    expect(searchBox.value).toBe('Blue Margarita');

    const radioName = screen.getByTestId(RADIONAME);
    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    const searchBarBtn = screen.getByRole('button', { name: /search/i });
    await act(async () => userEvent.click(searchBarBtn));

    const BMARGARITAURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Blue Margarita';

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(BMARGARITAURL);
    });
    const recipeName = await screen.findByText(/blue margarita/i);
    expect(recipeName).toBeInTheDocument();
  });
  // test('Search recipes by name - Alert for more than one letter', async () => {
  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(mockNull),
  //   }));
  //   await act(async () => renderWithRouter(
  //     <AppContext.Provider
  //       value={
  //         { resultsApiContext: { drinks: [], meals: [] },
  //           setResultsApiContext: jest.fn() }
  //       }
  //     >
  //       <App />
  //     </AppContext.Provider>,
  //     { initialEntries: ['/drinks'] },
  //   ));

  //   // await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

  //   const searchBtn = screen.getByTestId(SEARCHBTNID);
  //   userEvent.click(searchBtn);
  //   const searchBox = screen.getByRole('searchbox');

  //   userEvent.type(searchBox, 'xablau');
  //   expect(searchBox.value).toBe('xablau');

  //   // const radioFirstLetter = screen.getByTestId(RADIOFIRSTLETTER);
  //   // userEvent.click(radioFirstLetter);
  //   // expect(radioFirstLetter).toBeChecked();

  //   const searchBarBtn = screen.getByRole('button', { name: /search/i });
  //   await act(async () => userEvent.click(searchBarBtn));

  //   await waitFor(() => {
  //     expect(global.alert).toHaveBeenCalledTimes(1);
  //   });

  //   // expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  // });
});
