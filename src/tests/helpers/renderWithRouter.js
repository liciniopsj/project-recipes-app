import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export const renderWithRouterLegacy = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
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
