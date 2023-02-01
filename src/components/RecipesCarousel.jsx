import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecipesCarousel({ recipeRecomendations }) {
  console.log('RECOMENDATIONS', recipeRecomendations);
  const carouselLimit = 6;
  return (
    <Slider infinite={ false } slidesToShow={ 2 }>
      {
        (recipeRecomendations !== ''
          && recipeRecomendations.slice(0, carouselLimit).map((recomm, index) => (
            <div data-testid={ `${index}-recommendation-card` } key={ index }>
              <h4
                data-testid={ `${index}-recommendation-title` }
              >
                { recomm.strDrink || recomm.strMeal }
              </h4>
              <img
                key={ index }
                src={ recomm.strDrinkThumb || recomm.strMealThumb }
                alt={ recomm.strDrink || recomm.strMeal }
              />
            </div>
          ))
        )
      }
    </Slider>
  );
}

RecipesCarousel.propTypes = {
  recipeRecomendations: PropTypes.array,
}.isRequired;

export default RecipesCarousel;
