/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'react-slick';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecipesCarousel({ recipeRecomendations }) {
  console.log('RECOMENDATIONS', recipeRecomendations);
  // const carouselLimit = 6;
  return (
    <Slider slidesToShow={ 2 }>
      {
        recipeRecomendations.map((recomm, index) => (
          <div key={ index }>
            <h4
              data-testid={ `${index}-recommendation-title` }
            >
              { recomm.strDrink || recomm.strMeal }
            </h4>
            <img
              data-testid={ `${index}-recommendation-card` }
              src={ recomm.strDrinkThumb || recomm.strMealThumb }
              alt={ recomm.strDrink || recomm.strMeal }
            />
          </div>
        ))
      }
    </Slider>
  );
}

export default RecipesCarousel;
