import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
// import useFetch from '../hooks/useFetch';
// import { mockedValueMeals } from '../tests/helpers/MockedMeals';

function SearchBar() {
  const { resultsApiContext, setResultsApiContext } = useContext(AppContext);
  const [apiResults, setApiResults] = useState({ meals: [], drinks: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('ingredient');
  // const { makeFetch } = useFetch();

  const history = useHistory();

  useEffect(() => {
    const handleSingleResults = async () => {
      if (resultsApiContext.meals && resultsApiContext.meals.length === 1) {
        history.push(`${history.location.pathname}/${resultsApiContext.meals[0].idMeal}`);
      }
      if (resultsApiContext.drinks && resultsApiContext.drinks.length === 1) {
        history
          .push(`${history.location.pathname}/${resultsApiContext.drinks[0].idDrink}`);
      }
      if (resultsApiContext.meals === null || resultsApiContext.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    handleSingleResults();
    // console.log(resultsApiContext);
    // console.log(mockedValueMeals);
  }, [history, resultsApiContext]);

  const handleSearchBtn = async () => {
    const domain = history.location.pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
    // console.log(domain);
    let url = '';
    if (searchType === 'ingredient') {
      url = `https://www.${domain}.com/api/json/v1/1/filter.php?i=${searchQuery}`;
    } else if (searchType === 'name') {
      url = `https://www.${domain}.com/api/json/v1/1/search.php?s=${searchQuery}`;
      // console.log(url);
    } else if (searchType === 'first-letter') {
      if (searchQuery.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      url = `https://www.${domain}.com/api/json/v1/1/search.php?f=${searchQuery}`;
    }
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    setApiResults({ ...apiResults, ...result });
    setResultsApiContext({ ...apiResults, ...result });
    // console.log(resultsApiContext);
  };
  return (
    <div>
      <input
        data-testid="search-input"
        type="search"
        value={ searchQuery }
        onChange={ ({ target }) => setSearchQuery(target.value) }
      />
      <label htmlFor="ingredient-radio">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-radio"
          name="search-radio-button-group"
          onClick={ ({ target }) => setSearchType(target.value) }
          value="ingredient"
          defaultChecked
        />
        Ingredient
      </label>
      <label htmlFor="name-radio">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name-radio"
          value="name"
          name="search-radio-button-group"
          onClick={ ({ target }) => setSearchType(target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter-radio">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-radio"
          value="first-letter"
          name="search-radio-button-group"
          onClick={ ({ target }) => setSearchType(target.value) }
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearchBtn }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
