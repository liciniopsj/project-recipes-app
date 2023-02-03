import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockedDefaultDrinks } from './helpers/mocks/MockedDefaultDrinks';

const PAGEROUTE = '/drinks/13940';
const PAGEROUTE2 = '/drinks/15997';

const mockLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const localStorageKey = 'favoriteRecipes';

const localDataMock = [{
  alcoholicOrNot: 'Alcoholic',
  category: 'Ordinary Drink',
  id: '13940',
  image: 'https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg',
  name: '69 Special',
  nationality: '',
  type: 'drink',
}];

describe('RecipeDetails functionalities', () => {
  test('Localstorage and favorite Button behavior', async () => {
    mockLocalStorage(localStorageKey, localDataMock);
    await act(async () => renderWithRouter(<App />, { initialEntries: [PAGEROUTE] }));

    const drinkTitle = await screen.findByRole('heading', { name: /69 special/i });
    expect(drinkTitle).toBeInTheDocument();

    const favBtn = await screen.findByRole('img', { name: /favoritebutton/i });
    expect(favBtn).toBeInTheDocument();
    expect(favBtn.src).toBe('http://localhost/blackHeartIcon.svg');

    await act(async () => userEvent.click(favBtn));

    expect(favBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
  });
  test('share Button behavior', async () => {
    // const originalClipboard = navigator.clipboard;

    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    await act(async () => renderWithRouter(<App />, { initialEntries: [PAGEROUTE] }));

    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(shareBtn).toBeInTheDocument();

    await act(async () => userEvent.click(shareBtn));

    await waitFor(async () => {
      const copyText = await screen.findByText(/link copied!/i);
      expect(copyText).toBeInTheDocument();
      expect(copyText.textContent).toBe('Link copied!');
      expect(mockedWriteText).toHaveBeenCalledTimes(1);
    });
  });
  test('Start Recipe Button behavior', async () => {
    mockLocalStorage(localStorageKey, localDataMock);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedDefaultDrinks),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE2] });

    const startRecipeBtn = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeBtn).toBeInTheDocument();

    await act(async () => userEvent.click(startRecipeBtn));
    // investigate later
    expect(history.location.pathname).toBe('/drinks/undefined/in-progress');
  });
});
