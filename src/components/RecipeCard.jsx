/* eslint-disable react/prop-types */
import React from 'react';

function RecipeCard({ recipeName, recipeImg, recipeId }) {
  return (
    <span data-testid={ `${recipeId}-recipe-card` }>
      <img
        src={ recipeImg }
        alt={ recipeName }
        data-testid={ `${recipeId}-card-img` }
      />
      <p data-testid={ `${recipeId}-card-name` }><strong>{ recipeName }</strong></p>
    </span>
  );
}

export default RecipeCard;
