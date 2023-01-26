import React from 'react';
import useFetch from '../hooks/useFetch';

function SearchBar() {
  // const [apiResults, setApiResults] = useState('');
  const { makeFetch } = useFetch();

  const handleSearchBtn = async () => {
    const result = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');
    console.log(result);
  };
  return (
    <div>
      <input
        data-testid="search-input"
        type="search"
      />
      <label htmlFor="ingredient-radio">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-radio"
          name="search-radio-button-group"
        />
        Ingredient
      </label>
      <label htmlFor="name-radio">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name-radio"
          name="search-radio-button-group"
        />
        Name
      </label>
      <label htmlFor="first-letter-radio">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-radio"
          name="search-radio-button-group"
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
