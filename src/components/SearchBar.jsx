import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import useFetch from '../hooks/useFetch';

function SearchBar() {
  const { setResultsApiContext } = useContext(AppContext);
  const [apiResults, setApiResults] = useState({ meals: [], drinks: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('ingredient');
  const { makeFetch } = useFetch();

  const history = useHistory();

  useEffect(() => {
    const handleSingleResults = async () => {
      if (apiResults.meals && apiResults.meals.length === 1) {
        history.push(`${history.location.pathname}/${apiResults.meals[0].idMeal}`);
      }
      if (apiResults.drinks && apiResults.drinks.length === 1) {
        history.push(`${history.location.pathname}/${apiResults.drinks[0].idDrink}`);
      }
      if (apiResults.meals === null || apiResults.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    handleSingleResults();
  }, [apiResults, history]);

  const handleSearchBtn = async () => {
    const domain = history.location.pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
    console.log(domain);
    let url = '';
    if (searchType === 'ingredient') {
      url = `https://www.${domain}.com/api/json/v1/1/filter.php?i=${searchQuery}`;
    } else if (searchType === 'name') {
      url = `https://www.${domain}.com/api/json/v1/1/search.php?s=${searchQuery}`;
      console.log(url);
    } else if (searchType === 'first-letter') {
      if (searchQuery.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      url = `https://www.${domain}.com/api/json/v1/1/search.php?f=${searchQuery}`;
    }
    const result = await makeFetch(url);
    setApiResults({ ...apiResults, ...result });
    setResultsApiContext({ ...apiResults, ...result });
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
