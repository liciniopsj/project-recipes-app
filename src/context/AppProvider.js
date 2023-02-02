import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [resultsApiContext, setResultsApiContext] = useState({ meals: [], drinks: [] });
  const [recipeDetailsContext, setRecipeDetailsContext] = useState({});
  const contextValue = useMemo(() => ({
    resultsApiContext,
    setResultsApiContext,
    recipeDetailsContext,
    setRecipeDetailsContext,
  }), [resultsApiContext, recipeDetailsContext]);

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
