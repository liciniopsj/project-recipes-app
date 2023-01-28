import React from 'react';
import PropTypes from 'prop-types';

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

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
  recipeId: PropTypes.string,
}.isRequired;

export default RecipeCard;
