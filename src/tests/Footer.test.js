import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mockedDefaultMeals } from './helpers/mocks/MockedDefaultMeals';
import { mockedDefaultDrinks } from './helpers/mocks/MockedDefaultDrinks';

describe('Test Footer page', () => {
  const email = 'teste@teste.com';

  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', email)),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('checks for existence of inputs', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    ));

    const drinkButton = screen.getByRole('button', { name: /drink icon/i });
    const mealButton = screen.getByRole('button', { name: /meals icon/i });

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
  });
  test('Drinks button interaction', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    ));

    const drinkButton = screen.getByRole('button', { name: /drink icon/i });
    const mealButton = screen.getByRole('button', { name: /meals icon/i });

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', email))
        .mockResolvedValue(mockedDefaultDrinks),
    });

    await act(() => renderWithRouter(
      <App />,
      { initialEntries: ['/drinks'] },
    ));

    const drinkTitle = screen.getAllByTestId('page-title');

    expect(drinkTitle[0]).toBeInTheDocument();
  });
  test('Meals button interaction', async () => {
    await act(async () => renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    ));

    const drinkButton = screen.getByRole('button', { name: /drink icon/i });
    const mealButton = screen.getByRole('button', { name: /meals icon/i });

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();

    userEvent.click(mealButton);

    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user', email))
        .mockResolvedValue(mockedDefaultMeals),
    });

    await act(() => renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    ));

    const mealTitle = screen.getAllByTestId('page-title');

    expect(mealTitle[0]).toBeInTheDocument();
  });
});
