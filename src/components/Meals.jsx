import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { AppContext } from '../context/AppProvider';
import Footer from './Footer';

export default function Meals() {
  const { resultsApiContext } = useContext(AppContext);
  const [dataDefault, setDataDefault] = useState();
  const renderLimit = 12;
  const history = useHistory();
  const drawSearchIcon = true;

  useEffect(() => {
    const fetchDefaultApi = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const data = await request.json();
      setDataDefault(data.meals);
    };
    fetchDefaultApi();
  }, []);

  const drawHeader = () => {
    if (history.location.pathname === '/meals') {
      return true;
    }
  };

  if (!dataDefault) {
    return <p data-testid="loading">Carregando...</p>;
  }
  return (
    <>
      <div>
        {drawHeader() ? <Header title="Meals" hasSearchIcon={ drawSearchIcon } /> : null}
        <div>
          { resultsApiContext.meals === null
            || resultsApiContext.meals.length === 0 ? dataDefault
              .slice(0, renderLimit).map((meal, index) => (
                <RecipeCard
                  key={ index }
                  recipeRoute={ meal.idMeal }
                  recipeName={ meal.strMeal }
                  recipeImg={ meal.strMealThumb }
                  recipeId={ index }
                />
              )) : resultsApiContext.meals
              .slice(0, renderLimit).map((meal, index) => (
                <RecipeCard
                  key={ index }
                  recipeRoute={ meal.idMeal }
                  recipeName={ meal.strMeal }
                  recipeImg={ meal.strMealThumb }
                  recipeId={ index }
                />
              )) }
        </div>
      </div>
      {
        drawHeader() ? <Footer /> : null
      }
    </>
  );
}
