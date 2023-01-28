import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import AppProvider from '../../context/AppProvider';

export const renderWithRouterLegacy = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <AppProvider><Router history={ history }>{component}</Router></AppProvider>,
    ),
    history,
  });
};

export function withRouter(component, history) {
  return (
    <AppProvider>
      <Router history={ history }>
        { component }
      </Router>
    </AppProvider>
  );
}

export default function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
