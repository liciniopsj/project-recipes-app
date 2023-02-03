/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { parseDrinkIngredientsData, parseDrinkMeasuresData,
  parseMealIngredientsData, parseMealMeasuresData,
  returnDoneTemplateObject,
  returnFavTemplateObject } from '../helpers/helpers';

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

  console.log('RECIPE', recipe);

  let flavFlag = false;
  if (localStorage.getItem('favoriteRecipes')) {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    flavFlag = favorite
      .some((fav) => fav.idMeal === recipeId || fav.idDrink === recipeId);
  }
  const [isFavorite, setIsFavorite] = useState(flavFlag);
  const { pathname } = location;
  const foodCheckMeal = !!pathname.includes('meals');
  const drinksCheckMeal = !!pathname.includes('drinks');

  const regex = /\d+/g;
  console.log('LOADING', isLoading);

  // CSS
  const buttonStyle = {
    position: 'fixed',
    bottom: '0px',
  };

  const handleShareBtn = () => {
    setDrawSpan(!drawSpan);
    const amountToChop = -12;
    const currentURL = window.location.href;
    const choppedURL = currentURL.slice(0, amountToChop);
    copy(choppedURL);
  };

  const handleFavoriteBtn = () => {
    const oldFavorite = [];

    if (localStorage.getItem('favoriteRecipes')) {
      oldFavorite.push(...JSON.parse(localStorage.getItem('favoriteRecipes')));
    }

    oldFavorite.push(returnFavTemplateObject(recipe));

    localStorage.setItem(
      'favoriteRecipes',
      (
        JSON.stringify(oldFavorite)),
    );
    setIsFavorite(!isFavorite);
  };

  let values = [];
  const handleCheckbox = (e) => {
    const originalValues = Array.from(
      document.querySelectorAll('input[type="checkbox"]'),
    );
    console.log('ORIGINAL', Array.from(originalValues));
    values = Array.from(document.querySelectorAll('input[type="checkbox"]'))
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.checked);
    console.log('STATUS', values);

    if (e.target.checked) {
      e.target.parentElement.style = 'text-decoration: line-through solid rgb(0, 0, 0)';
    } else {
      e.target.parentElement.style = 'text-decoration: none solid rgb(0, 0, 0)';
    }

    if (values.length !== originalValues.length) {
      setRecipeState(false);
      setIsLoading(false);
    } else if (values.length === originalValues.length) {
      setRecipeState(true);
    }
  };

  const handleFinishBtn = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(returnDoneTemplateObject(recipe)));

    history.push('/done-recipes');
  };

  useEffect(() => {
    const getRecipeMeals = async () => {
      const id = pathname.replace('/meals/', '').match(regex);
      setIsLoading(true);
      try {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const promise = await fetch(URL);
        const data = await promise.json();
        setRecipe(data.meals[0]);
        setIngredients(parseMealIngredientsData(data));
        setMeasures(parseMealMeasuresData(data));
      } finally {
        setIsLoading(false);
      }
    };
    const getRecipeDrinks = async () => {
      const id = pathname.replace('/drinks/', '').match(regex);
      setIsLoading(true);
      try {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const promise = await fetch(URL);
        const data = await promise.json();
        setRecipe(data.drinks[0]);
        setIngredients(parseDrinkIngredientsData(data));
        setMeasures(parseDrinkMeasuresData(data));
      } finally {
        setIsLoading(false);
      }
    };
    if (foodCheckMeal) getRecipeMeals();
    if (drinksCheckMeal) getRecipeDrinks();
  }, [drinksCheckMeal, foodCheckMeal, isFavorite]);

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
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ `${index}-ingred` }
                >
                  <input
                    id={ `${index}-ingred` }
                    type="checkbox"
                    onChange={ (e) => handleCheckbox(e) }
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
