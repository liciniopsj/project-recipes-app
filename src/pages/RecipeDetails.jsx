import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeDetailsCard from '../components/RecipeDetailsCard';

function RecipeDetails() {
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recomm, setRecomm] = useState('');
  const location = useLocation();
  const history = useHistory();
  const [drawSpan, setDrawSpan] = useState(false);
  console.log('asdasdasd', recipe.idMeal);
  console.log(location);
  const { pathname } = location;
  const foodCheckMeal = !!pathname.includes('meals');
  const drinksCheckMeal = !!pathname.includes('drinks');
  const recommDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const recommMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const isDone = false;
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipeId = recipe.idMeal || recipe.idDrink;
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

  const handleShareBtn = () => {
    setDrawSpan(!drawSpan);
    copy(window.location.href);
  };

  const handleFavoriteBtn = () => {
    const oldFavorite = [];

    if (localStorage.getItem('favoriteRecipes')) {
      oldFavorite.push(...JSON.parse(localStorage.getItem('favoriteRecipes')));
      console.log('OLD FAVORITE 1', oldFavorite);
    }

    oldFavorite.push(templateObject);

    console.log('OLD FAVORITE 2', oldFavorite);

    localStorage.setItem(
      'favoriteRecipes',
      (
        JSON.stringify(oldFavorite)),
    );
  };

  useEffect(() => {
    const getRecomm = async () => {
      const recommUrl = foodCheckMeal ? recommDrinks : recommMeals;
      const promise = await fetch(recommUrl);
      const data = await promise.json();
      console.log('Recomm', data);
      setRecomm(data.meals || data.drinks);
    };
    const getRecipeMeals = async () => {
      const id = pathname.replace('/meals/', '');
      setIsLoading(true);
      try {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const promise = await fetch(URL);
        const data = await promise.json();
        console.log('Data', data.meals[0]);
        setRecipe(data.meals[0]);
      } finally {
        setIsLoading(false);
      }
    };
    const getRecipeDrinks = async () => {
      const id = pathname.replace('/drinks/', '');
      setIsLoading(true);
      try {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const promise = await fetch(URL);
        const data = await promise.json();
        console.log('Data', data.drinks[0]);
        setRecipe(data.drinks[0]);
      } finally {
        setIsLoading(false);
      }
    };
    console.log('foodcheck', foodCheckMeal);
    console.log('drinkcheck', drinksCheckMeal);
    if (foodCheckMeal) getRecipeMeals();
    if (drinksCheckMeal) getRecipeDrinks();
    getRecomm();
  }, [drinksCheckMeal, foodCheckMeal, location.state, pathname]);

  // console.log('Recipe', recipe);
  // console.log('Recomm', recomm);
  console.log('Loading', isLoading);

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        Share
      </button>
      {
        drawSpan ? <span>Link copied!</span> : null
      }
      {/* {foodCheckMeal ? <h1>{recipe.strMeal}</h1> : <h1>{recipe.strDrink}</h1>} */}
      {foodCheckMeal ? (
        <RecipeDetailsCard
          handlefavoriteState={ handleFavoriteBtn }
          recipe={ {
            photo: recipe.strMealThumb,
            title: recipe.strMeal,
            category: recipe.strCategory,
            ingredients: [recipe.strIngredient1, recipe.strIngredient2,
              recipe.strIngredient3, recipe.strIngredient4,
              recipe.strIngredient5, recipe.strIngredient6,
              recipe.strIngredient7, recipe.strIngredient8,
              recipe.strIngredient9, recipe.strIngredient10,
              recipe.strIngredient11, recipe.strIngredient12,
              recipe.strIngredient13, recipe.strIngredient14,
              recipe.strIngredient15, recipe.strIngredient16,
              recipe.strIngredient17, recipe.strIngredient18,
              recipe.strIngredient19, recipe.strIngredient20],
            measures: [recipe.strMeasure1, recipe.strMeasure2,
              recipe.strMeasure3, recipe.strMeasure4, recipe.strMeasure5,
              recipe.strMeasure6, recipe.strMeasure7, recipe.strMeasure8,
              recipe.strMeasure9, recipe.strMeasure10, recipe.strMeasure11,
              recipe.strMeasure12, recipe.strMeasure13, recipe.strMeasure14,
              recipe.strMeasure15, recipe.strMeasure16, recipe.strMeasure17,
              recipe.strMeasure18, recipe.strMeasure19, recipe.strMeasure20],
            instructions: recipe.strInstructions,
            video: recipe.strYoutube?.replace('https://www.youtube.com/watch?v=', ''),
            recommendation: recomm,
          } }
        />
      ) : (
        <RecipeDetailsCard
          handlefavoriteState={ handleFavoriteBtn }
          recipe={ {
            photo: recipe.strDrinkThumb,
            title: recipe.strDrink,
            category: recipe.strCategory,
            ingredients: [recipe.strIngredient1, recipe.strIngredient2,
              recipe.strIngredient3, recipe.strIngredient4,
              recipe.strIngredient5, recipe.strIngredient6,
              recipe.strIngredient7, recipe.strIngredient8,
              recipe.strIngredient9, recipe.strIngredient10,
              recipe.strIngredient11, recipe.strIngredient12,
              recipe.strIngredient13, recipe.strIngredient14,
              recipe.strIngredient15],
            measures: [recipe.strMeasure1, recipe.strMeasure2,
              recipe.strMeasure3, recipe.strMeasure4, recipe.strMeasure5,
              recipe.strMeasure6, recipe.strMeasure7, recipe.strMeasure8,
              recipe.strMeasure9, recipe.strMeasure10, recipe.strMeasure11,
              recipe.strMeasure12, recipe.strMeasure13, recipe.strMeasure14,
              recipe.strMeasure15, recipe.strMeasure16, recipe.strMeasure17,
              recipe.strMeasure18, recipe.strMeasure19, recipe.strMeasure20],
            instructions: recipe.strInstructions,
            video: recipe.strYoutube?.replace('https://www.youtube.com/watch?v=', ''),
            isAlcoholic: recipe.strAlcoholic,
            recommendation: recomm,
          } }
        />
      )}
      <span>
        <button
          style={ buttonStyle }
          data-testid="start-recipe-btn"
          disabled={ isDone }
          onClick={ () => history.push(`${recipeId}/in-progress`) }
        >
          { inProgress !== null ? 'Continue Recipe' : 'Start Recipe' }

        </button>
      </span>
    </div>
  );
}

export default RecipeDetails;
