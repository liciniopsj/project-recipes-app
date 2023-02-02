/* eslint-disable max-lines */
/* eslint-disable react-func/max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const [drawSpan, setDrawSpan] = useState(false);
  const [recipeState, setRecipeState] = useState(false);
  const recipeId = recipe.idMeal || recipe.idDrink;
  let flavFlag = false;
  if (localStorage.getItem('favoriteRecipes')) {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    flavFlag = favorite
      .some((fav) => fav.idMeal === recipeId || fav.idDrink === recipeId);
    // console.log('ISFAVORITEFLAG', flavFlag);
  }
  const [isFavorite, setIsFavorite] = useState(flavFlag);
  // console.log('ISFAVORITESTATE', isFavorite);
  // console.log(location);
  const { pathname } = location;
  // console.log('PATHNAME', location.pathname);
  const foodCheckMeal = !!pathname.includes('meals');
  const drinksCheckMeal = !!pathname.includes('drinks');
  const recipeType = recipe.idMeal ? 'meal' : 'drink';

  const templateObject = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipeType,
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb };

  // CSS
  const buttonStyle = {
    position: 'fixed',
    bottom: '0px',
  };

  const checkboxStyle = {
    textDecoration: 'line-through solid rgb(0, 0, 0)',
  };

  const handleShareBtn = () => {
    setDrawSpan(!drawSpan);
    const amountToChop = -12;
    const currentURL = window.location.href;
    const choppedURL = currentURL.slice(0, amountToChop);
    console.log('CHOPPED URL', choppedURL);
    copy(choppedURL);
  };

  const handleFinishBtn = () => {
    setRecipeState(true);

    // redirect user to done recipes page
    history.push('/done-recipes');
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
    // console.log('ISFAVORITE', isFavorite);
  };

  useEffect(() => {
    const getRecipeMeals = async () => {
      const id = pathname.replace('/meals/', '');
      const regex = /\d+/g;
      const newID = id.match(regex);
      // console.log('EXTRACTED ID', newID.toString());
      setIsLoading(true);
      try {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${newID}`;
        // console.log('ENDPOINT', URL);
        const promise = await fetch(URL);
        const data = await promise.json();
        // console.log('DATA', data);
        setRecipe(data.meals[0]);
        setIngredients([data.meals[0].strIngredient1, data.meals[0].strIngredient2,
          data.meals[0].strIngredient3, data.meals[0].strIngredient4,
          data.meals[0].strIngredient5, data.meals[0].strIngredient6,
          data.meals[0].strIngredient7, data.meals[0].strIngredient8,
          data.meals[0].strIngredient9, data.meals[0].strIngredient10,
          data.meals[0].strIngredient11, data.meals[0].strIngredient12,
          data.meals[0].strIngredient13, data.meals[0].strIngredient14,
          data.meals[0].strIngredient15, data.meals[0].strIngredient16,
          data.meals[0].strIngredient17, data.meals[0].strIngredient18,
          data.meals[0].strIngredient19, data.meals[0].strIngredient20]);
        setMeasures([data.meals[0].strMeasure1, recipe.strMeasure2,
          data.meals[0].strMeasure3, data.meals[0].strMeasure4,
          data.meals[0].strMeasure5, data.meals[0].strMeasure6,
          data.meals[0].strMeasure7, data.meals[0].strMeasure8,
          data.meals[0].strMeasure9, data.meals[0].strMeasure10,
          data.meals[0].strMeasure11, data.meals[0].strMeasure12,
          data.meals[0].strMeasure13, data.meals[0].strMeasure14,
          data.meals[0].strMeasure15, data.meals[0].strMeasure16,
          data.meals[0].strMeasure17, data.meals[0].strMeasure18,
          data.meals[0].strMeasure19, data.meals[0].strMeasure20]);
        console.log('measures', measures);
        console.log('ingredients', ingredients);
      } finally {
        setIsLoading(false);
      }
    };
    const getRecipeDrinks = async () => {
      const id = pathname.replace('/drinks/', '');
      const regex = /\d+/g;
      const newID = id.match(regex);
      // console.log('EXTRACTED ID', newID.toString());
      setIsLoading(true);
      try {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${newID}`;
        const promise = await fetch(URL);
        const data = await promise.json();
        // console.log('DATA', data.drinks[0]);
        setRecipe(data.drinks[0]);
        setIngredients([data.drinks[0].strIngredient1, data.drinks[0].strIngredient2,
          data.drinks[0].strIngredient3, data.drinks[0].strIngredient4,
          data.drinks[0].strIngredient5, data.drinks[0].strIngredient6,
          data.drinks[0].strIngredient7, data.drinks[0].strIngredient8,
          data.drinks[0].strIngredient9, data.drinks[0].strIngredient10,
          data.drinks[0].strIngredient11, data.drinks[0].strIngredient12,
          data.drinks[0].strIngredient13, data.drinks[0].strIngredient14,
          data.drinks[0].strIngredient15, data.drinks[0].strIngredient16,
          data.drinks[0].strIngredient17, data.drinks[0].strIngredient18,
          data.drinks[0].strIngredient19, data.drinks[0].strIngredient20]);
        setMeasures([data.drinks[0].strMeasure1, recipe.strMeasure2,
          data.drinks[0].strMeasure3, data.drinks[0].strMeasure4,
          data.drinks[0].strMeasure5, data.drinks[0].strMeasure6,
          data.drinks[0].strMeasure7, data.drinks[0].strMeasure8,
          data.drinks[0].strMeasure9, data.drinks[0].strMeasure10,
          data.drinks[0].strMeasure11, data.drinks[0].strMeasure12,
          data.drinks[0].strMeasure13, data.drinks[0].strMeasure14,
          data.drinks[0].strMeasure15, data.drinks[0].strMeasure16,
          data.drinks[0].strMeasure17, data.drinks[0].strMeasure18,
          data.drinks[0].strMeasure19, data.drinks[0].strMeasure20]);
        // console.log('measures', measures);
        // console.log('ingredients', ingredients);
      } finally {
        setIsLoading(false);
      }
    };
    // console.log('foodcheck', foodCheckMeal);
    // console.log('drinkcheck', drinksCheckMeal);
    if (foodCheckMeal) getRecipeMeals();
    if (drinksCheckMeal) getRecipeDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinksCheckMeal, foodCheckMeal, isFavorite]);

  // console.log('Recomm', recomm);
  // console.log('Recipe', recipe);
  console.log('Loading', isLoading);
  console.log('Ingredients', ingredients);

  return (
    <div>
      <h1>In-progress</h1>
      <button
        data-testid="share-btn"
        onClick={ handleShareBtn }
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="shareButton"
        />
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
      {/* {foodCheckMeal ? <h1>{recipe.strMeal}</h1> : <h1>{recipe.strDrink}</h1>} */}
      {foodCheckMeal ? (
        <RecipeDetailsCard
          recipe={ {
            photo: recipe.strMealThumb,
            title: recipe.strMeal,
            category: recipe.strCategory,
            ingredients: [ingredients],
            measures: [measures],
            instructions: recipe.strInstructions,
            recommendation: '',
            favorite: isFavorite,
          } }
        />
      ) : (
        <RecipeDetailsCard
          handlefavoriteState={ handleFavoriteBtn }
          recipe={ {
            photo: recipe.strDrinkThumb,
            title: recipe.strDrink,
            category: recipe.strCategory,
            ingredients: [ingredients],
            measures: [measures],
            instructions: recipe.strInstructions,
            isAlcoholic: recipe.strAlcoholic,
            recommendation: '',
            favorite: isFavorite,
          } }
        />
      )}
      <span>
        {
          ingredients !== null && ingredients
            .filter((ingred) => (
              ingred !== '' && ingred !== null && ingred !== undefined))
            .map((ingred, index) => (
              <>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                  htmlFor={ `${index}-ingred` }
                >
                  <input
                    id={ `${index}-ingred` }
                    type="checkbox"
                    style={ checkboxStyle }
                  />
                  { ingred.length > 0 && ingred }
                </label>
                <br />
              </>
            ))
        }
        <br />
        <button
          style={ buttonStyle }
          data-testid="finish-recipe-btn"
          disabled={ !recipeState }
          onClick={ handleFinishBtn }
        >
          Finish Recipe
        </button>
      </span>
    </div>
  );
}

export default RecipeInProgress;
