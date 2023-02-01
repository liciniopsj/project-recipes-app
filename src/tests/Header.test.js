import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockedDefaultMeals } from './helpers/mocks/MockedDefaultMeals';

describe('Test Header component', () => {
  const PROFILEIMGTESTID = 'profile-top-btn';
  const SEARCHIMGTESTID = 'search-top-btn';
  const SEARCHBARTESTID = 'search-input';
  const PAGEROUTE = '/meals';
  const SWITCHROUTE = '/profile';
  const PAGETITLE = 'Meals';
  const SWITCHPAGETITLE = 'Profile';
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

    const pageTitle = await screen.findByText(PAGETITLE);

    expect(pageTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe(PAGEROUTE);
  });

  test('if icons render in the page', async () => {
    renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const profileImg = screen.getByTestId(PROFILEIMGTESTID);
    const searchImg = screen.getByTestId(SEARCHIMGTESTID);
    const hiddenSearchBar = screen.queryByTestId(SEARCHBARTESTID);

    expect(profileImg).toBeInTheDocument();
    expect(searchImg).toBeInTheDocument();
    expect(hiddenSearchBar).not.toBeInTheDocument();

    userEvent.click(searchImg);

    const searchBar = screen.queryByTestId(SEARCHBARTESTID);
    expect(searchBar).toBeInTheDocument();
  });

  test('user get redirected to profile after clicking the profile button', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING));

    const profileImg = screen.getByTestId(PROFILEIMGTESTID);

    expect(profileImg).toBeInTheDocument();

    userEvent.click(profileImg);
    expect(history.location.pathname).toBe(SWITCHROUTE);

    const switchPageTitle = screen.getByRole('heading', { level: 1, name: SWITCHPAGETITLE });
    expect(switchPageTitle).toBeInTheDocument();
  });
});
