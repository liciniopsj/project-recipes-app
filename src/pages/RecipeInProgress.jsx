import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useLocation } from 'react-router-dom';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import { AppContext } from '../context/AppProvider';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { recipeDetailsContext } = useContext(AppContext);
  const [drawSpan, setDrawSpan] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const foodCheckMeal = !!pathname.includes('meals');
  const recipeId = recipeDetailsContext.idMeal || recipeDetailsContext.idDrink;
  let flavFlag = false;
  if (localStorage.getItem('favoriteRecipes')) {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    flavFlag = favorite
      .some((fav) => fav.idMeal === recipeId || fav.idDrink === recipeId);
    // console.log('ISFAVORITEFLAG', flavFlag);
  }
  const [isFavorite, setIsFavorite] = useState(flavFlag);

  const templateObject = {
    id: recipeDetailsContext.idMeal || recipeDetailsContext.idDrink,
    type: recipeDetailsContext,
    nationality: recipeDetailsContext.strArea || '',
    category: recipeDetailsContext.strCategory,
    alcoholicOrNot: recipeDetailsContext.strAlcoholic || '',
    name: recipeDetailsContext.strMeal || recipeDetailsContext.strDrink,
    image: recipeDetailsContext.strMealThumb || recipeDetailsContext.strDrinkThumb };

  // CSS
  const buttonStyle = {
    position: 'fixed',
    bottom: '0px',
  };

  const handleShareBtn = () => {
    setDrawSpan(!drawSpan);
    copy(window.location.href);
  };

  const handleFavoriteBtn = () => {
    const oldFavorite = [];

    if (localStorage.getItem('favoriteRecipes')) {
      oldFavorite.push(...JSON.parse(localStorage.getItem('favoriteRecipes')));
      // console.log('OLD FAVORITE 1', oldFavorite);
    }

    oldFavorite.push(templateObject);

    // console.log('OLD FAVORITE 2', oldFavorite);

    localStorage.setItem(
      'favoriteRecipes',
      (
        JSON.stringify(oldFavorite)),
    );
    setIsFavorite(!isFavorite);
    console.log('ISFAVORITE', isFavorite);
  };

  return (
    <div>
      <h1>Recipe in Progress</h1>
      <button
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        Share
      </button>
      <button
        data-testid="favorite-btn"
        onClick={ handleFavoriteBtn }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favoriteButton"
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favoriteButton"
        />
      </button>
      {
        drawSpan ? <span>Link copied!</span> : null
      }
      {/* {foodCheckMeal ? <h1>{recipeDetailsContext.strMeal}</h1> : <h1>{recipeDetailsContext.strDrink}</h1>} */}
      {foodCheckMeal ? (
        <RecipeDetailsCard
          handlefavoriteState={ handleFavoriteBtn }
          recipe={ {
            photo: recipeDetailsContext.strMealThumb,
            title: recipeDetailsContext.strMeal,
            category: recipeDetailsContext.strCategory,
            ingredients: [recipeDetailsContext.strIngredient1,
              recipeDetailsContext.strIngredient2,
              recipeDetailsContext.strIngredient3,
              recipeDetailsContext.strIngredient4,
              recipeDetailsContext.strIngredient5,
              recipeDetailsContext.strIngredient6,
              recipeDetailsContext.strIngredient7,
              recipeDetailsContext.strIngredient8,
              recipeDetailsContext.strIngredient9,
              recipeDetailsContext.strIngredient10,
              recipeDetailsContext.strIngredient11,
              recipeDetailsContext.strIngredient12,
              recipeDetailsContext.strIngredient13,
              recipeDetailsContext.strIngredient14,
              recipeDetailsContext.strIngredient15,
              recipeDetailsContext.strIngredient16,
              recipeDetailsContext.strIngredient17,
              recipeDetailsContext.strIngredient18,
              recipeDetailsContext.strIngredient19,
              recipeDetailsContext.strIngredient20],
            measures: [recipeDetailsContext.strMeasure1,
              recipeDetailsContext.strMeasure2,
              recipeDetailsContext.strMeasure3,
              recipeDetailsContext.strMeasure4,
              recipeDetailsContext.strMeasure5,
              recipeDetailsContext.strMeasure6,
              recipeDetailsContext.strMeasure7,
              recipeDetailsContext.strMeasure8,
              recipeDetailsContext.strMeasure9,
              recipeDetailsContext.strMeasure10,
              recipeDetailsContext.strMeasure11,
              recipeDetailsContext.strMeasure12,
              recipeDetailsContext.strMeasure13,
              recipeDetailsContext.strMeasure14,
              recipeDetailsContext.strMeasure15,
              recipeDetailsContext.strMeasure16,
              recipeDetailsContext.strMeasure17,
              recipeDetailsContext.strMeasure18,
              recipeDetailsContext.strMeasure19,
              recipeDetailsContext.strMeasure20],
            instructions: recipeDetailsContext.strInstructions,
            video: '',
            recommendation: '',
            favorite: isFavorite,
          } }
        />
      ) : (
        <RecipeDetailsCard
          handlefavoriteState={ handleFavoriteBtn }
          recipe={ {
            photo: recipeDetailsContext.strDrinkThumb,
            title: recipeDetailsContext.strDrink,
            category: recipeDetailsContext.strCategory,
            ingredients: [recipeDetailsContext.strIngredient1,
              recipeDetailsContext.strIngredient2,
              recipeDetailsContext.strIngredient3,
              recipeDetailsContext.strIngredient4,
              recipeDetailsContext.strIngredient5,
              recipeDetailsContext.strIngredient6,
              recipeDetailsContext.strIngredient7,
              recipeDetailsContext.strIngredient8,
              recipeDetailsContext.strIngredient9,
              recipeDetailsContext.strIngredient10,
              recipeDetailsContext.strIngredient11,
              recipeDetailsContext.strIngredient12,
              recipeDetailsContext.strIngredient13,
              recipeDetailsContext.strIngredient14,
              recipeDetailsContext.strIngredient15],
            measures: [recipeDetailsContext.strMeasure1,
              recipeDetailsContext.strMeasure2,
              recipeDetailsContext.strMeasure3,
              recipeDetailsContext.strMeasure4,
              recipeDetailsContext.strMeasure5,
              recipeDetailsContext.strMeasure6,
              recipeDetailsContext.strMeasure7,
              recipeDetailsContext.strMeasure8,
              recipeDetailsContext.strMeasure9,
              recipeDetailsContext.strMeasure10,
              recipeDetailsContext.strMeasure11,
              recipeDetailsContext.strMeasure12,
              recipeDetailsContext.strMeasure13,
              recipeDetailsContext.strMeasure14,
              recipeDetailsContext.strMeasure15,
              recipeDetailsContext.strMeasure16,
              recipeDetailsContext.strMeasure17,
              recipeDetailsContext.strMeasure18,
              recipeDetailsContext.strMeasure19,
              recipeDetailsContext.strMeasure20],
            instructions: recipeDetailsContext.strInstructions,
            video: recipeDetailsContext.strYoutube?.replace('https://www.youtube.com/watch?v=', ''),
            isAlcoholic: recipeDetailsContext.strAlcoholic,
            recommendation: '',
            favorite: isFavorite,
          } }
        />
      )}
      <span>
        <button
          style={ buttonStyle }
          data-testid="finish-recipe-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipe

        </button>
      </span>
    </div>

  );
}

export default RecipeInProgress;
