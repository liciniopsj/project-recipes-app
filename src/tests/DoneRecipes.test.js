import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Done Recipes page', () => {
  const PAGEROUTE = '/done-recipes';
  const SWITCHROUTE = '/profile';
  const PAGETITLE = 'Done Recipes';
  const SWITCHPAGETITLE = 'Profile';

  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', 'teste@teste.com')),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('check the app route and title', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    const pageTitle = screen.getByRole('heading', { level: 1, name: PAGETITLE });

    expect(pageTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe(PAGEROUTE);
  });

  test('if page title is correct', () => {
    renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    const pageTitle = screen.getByRole('heading', { level: 1, name: PAGETITLE });

    expect(pageTitle).toBeInTheDocument();
  });

  test('if page gets handled correctly in case the route is different', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    const pageTitle = screen.queryByRole('heading', { level: 1, name: PAGETITLE });
    expect(pageTitle).toBeInTheDocument();

    act(() => history.push(SWITCHROUTE));

    const switchPageTitle = screen.getByRole('heading', { level: 1, name: SWITCHPAGETITLE });
    expect(pageTitle).not.toBeInTheDocument();
    expect(switchPageTitle).toBeInTheDocument();
  });

  // test('if page gets handled correctly in case the route is different', () => {
  //   const mockLocalStorage = (key, data) => {
  //     window.localStorage.setItem(key, JSON.stringify(data));
  //   };

  //   const localDataMock = [{
  //     alcoholicOrNot: 'Alcoholic',
  //     category: 'Ordinary Drink',
  //     id: '13940',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg',
  //     name: '69 Special',
  //     nationality: '',
  //     type: 'drink',
  //   }];

  //   mockLocalStorage('doneRecipes', localDataMock);
  //   const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

  // });
});
