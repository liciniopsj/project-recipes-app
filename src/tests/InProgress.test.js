import React from 'react';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test inProgress page', () => {
  const PAGEROUTE = '/drinks/15997/in-progress';
  const PAGETITLE = 'In Progress';
  test('check the app route and title', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PAGEROUTE] });

    const pageTitle = screen.getByRole('heading', { level: 1, name: PAGETITLE });

    expect(pageTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe(PAGEROUTE);
  });
});
