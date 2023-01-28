import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Favorite Recipes page', () => {
  const PAGEROUTE = '/favorite-recipes';
  const SWITCHROUTE = '/profile';
  const PAGETITLE = 'Favorite Recipes';
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
});
