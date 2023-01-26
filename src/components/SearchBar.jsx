import React from 'react';

function SearchBar() {
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
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
