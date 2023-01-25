import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterLegacy } from './helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'teste@teste.com';
const PASSWORD = '1234567';

const EMAILTESTID = 'email-input';
const PASSWORDTESTID = 'password-input';

describe('Test Login page', () => {
  test('if compoments render in the page', () => {
    renderWithRouterLegacy(<App />);

    const emailInput = screen.getByTestId(EMAILTESTID);
    const passwordInput = screen.getByTestId(PASSWORDTESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  test('user can type on the login inputs', () => {
    renderWithRouterLegacy(<App />);

    const emailInput = screen.getByTestId(EMAILTESTID);
    const passwordInput = screen.getByTestId(PASSWORDTESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);

    expect(emailInput.value).toBe(EMAIL);
    expect(passwordInput.value).toBe(PASSWORD);

    expect(loginBtn).not.toBeDisabled();
  });

  test('Login Button behavior', () => {
    const { history } = renderWithRouterLegacy(<App />);

    const emailInput = screen.getByTestId(EMAILTESTID);
    const passwordInput = screen.getByTestId(PASSWORDTESTID);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);

    expect(emailInput.value).toBe(EMAIL);
    expect(passwordInput.value).toBe(PASSWORD);

    expect(loginBtn).not.toBeDisabled();

    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/meals');
  });
});
