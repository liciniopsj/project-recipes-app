import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeCard({ recipeName, recipeImg, recipeId, recipeRoute }) {
  const history = useHistory();
  const route = (
    history.location.pathname === '/meals' ? '/meals' : '/drinks');

  // CSS
  const imgStyle = {
    width: '350px',
    height: '600px',
  };

  return (
    <button
      onClick={ () => history.push(`${route}/${recipeRoute}`) }
      data-testid={ `${recipeId}-recipe-card` }
    >
      <img
        src={ recipeImg }
        alt={ recipeName }
        style={ imgStyle }
        data-testid={ `${recipeId}-card-img` }
      />
      <p data-testid={ `${recipeId}-card-name` }><strong>{ recipeName }</strong></p>
    </button>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
  recipeId: PropTypes.string,
}.isRequired;

export default RecipeCard;
