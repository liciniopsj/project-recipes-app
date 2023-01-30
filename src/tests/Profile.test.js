import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Profile page', () => {
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

  test('Checks for existence of inputs', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    ));

    const doneButton = screen.getByRole('button', { name: /done recipes/i });
    const favoriteButton = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  test('Done recipes button interaction', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    ));

    const doneButton = screen.getByRole('button', { name: /done recipes/i });

    userEvent.click(doneButton);

    await act(() => renderWithRouter(
      <App />,
      { initialEntries: ['/done-recipes'] },
    ));
    const titleDoneRecipes = screen.getAllByTestId('page-title');

    expect(titleDoneRecipes[0]).toBeInTheDocument();
  });
  test('Favorite recipes button interaction', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    ));

    const favoriteButton = screen.getByRole('button', { name: /favorite recipes/i });

    userEvent.click(favoriteButton);

    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/favorite-recipes'] },
    ));
    const titleFavoriteRecipes = screen.getAllByTestId('page-title');

    expect(titleFavoriteRecipes[0]).toBeInTheDocument();
  });
  test('Logout button interaction', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    ));

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    userEvent.click(logoutButton);

    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/'] },
    ));
    const initialButtonLogin = screen.getAllByTestId('login-submit-btn');

    expect(initialButtonLogin[0]).toBeInTheDocument();
  });
});
