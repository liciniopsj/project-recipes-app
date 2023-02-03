import React from 'react';
import PropTypes from 'prop-types';
import RecipesCarousel from './RecipesCarousel';

function RecipeDetailsCard({ recipe }) {
  const ingredients = recipe
    .ingredients[0].filter((e) => e != null && e !== '' && e !== undefined);
  const measures = recipe
    .measures[0].filter((e) => e != null && e !== '' && e !== undefined);

  console.log('INGREDIENTS', recipe.ingredients[0]);

  return (
    <div>
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

          e !== undefined && e !== null && (
            <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
              {`${e} ${measures[index]}`}
            </li>)
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
