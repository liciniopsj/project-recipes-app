import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Header component', () => {
  const PROFILEIMGTESTID = 'profile-top-btn';
  const SEARCHIMGTESTID = 'search-top-btn';
  const SEARCHBARTESTID = 'search-input';

  test('check the app route and title', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.getByRole('heading', { level: 1, name: 'Meals' });

    expect(pageTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');
  });

  test('if icons render in the page', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const profileImg = screen.getByTestId(PROFILEIMGTESTID);
    const searchImg = screen.getByTestId(SEARCHIMGTESTID);
    const searchBar = screen.queryByTestId(SEARCHBARTESTID);

    expect(profileImg).toBeInTheDocument();
    expect(searchImg).toBeInTheDocument();
    expect(searchBar).not.toBeInTheDocument();

    userEvent.click(searchImg);

    expect(searchBar).toBeInTheDocument();
  });

  test('user get redirected to profile after clicking the profile button', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const profileImg = screen.getByTestId(PROFILEIMGTESTID);

    expect(profileImg).toBeInTheDocument();

    userEvent.click(profileImg);
    expect(history.location.pathname).toBe('/profile');
  });
});
