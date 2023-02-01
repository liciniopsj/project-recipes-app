import React from 'react';
import PropTypes from 'prop-types';
import RecipesCarousel from './RecipesCarousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetailsCard({ recipe, handlefavoriteState }) {
  const ingredients = recipe
    .ingredients.filter((e) => e != null && e !== '');
  const measures = recipe
    .measures.filter((e) => e != null && e !== '');
  console.log('video', recipe.video);

  const checkFavorite = () => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log('HEART', favoriteRecipes);

      const filteredRecipes = favoriteRecipes.find((favorited) => (
        favorited.name === recipe.title));

      console.log('FILTERED RECIPES', filteredRecipes);

      if (filteredRecipes && recipe.title === filteredRecipes.name) {
        return true;
      }
    }

    return false;
  };

  return (
    <div>
      <button
        data-testid="favorite-btn"
        onClick={ handlefavoriteState }
        src={ checkFavorite() ? blackHeartIcon : whiteHeartIcon }
        alt="favoriteButton"
      >
        <img
          src={ checkFavorite() ? blackHeartIcon : whiteHeartIcon }
          alt="favoriteButton"
        />
      </button>
      <h1 data-testid="recipe-title">{recipe.title}</h1>
      <img data-testid="recipe-photo" src={ recipe.photo } alt={ recipe.title } />
      <h3 data-testid="recipe-category">
        {recipe.category}
        {' '}
        -
        {' '}
        {recipe.isAlcoholic || null}
      </h3>
      <h4>Ingredients</h4>
      <ul>
        {ingredients.map((e, index) => (
          <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {`${e} ${measures[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipe.instructions}</p>
      {recipe.video ? (
        <iframe
          data-testid="video"
          width="853"
          height="480"
          src={ `https://www.youtube.com/embed/${recipe.video}` }
          allow="accelerometer; clipboard-write; encrypted-media;
      gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : null}

      <RecipesCarousel recipeRecomendations={ recipe.recommendation } />

    </div>
  );
}

RecipeDetailsCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    photo: PropTypes.string,
    category: PropTypes.string,
    ingredientsAndMeasures: PropTypes.object,
    instructions: PropTypes.string,
    video: PropTypes.string,
  }.isRequired),
}.isRequired;

export default RecipeDetailsCard;
