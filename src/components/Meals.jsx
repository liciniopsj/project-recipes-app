import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { AppContext } from '../context/AppProvider';
import Footer from './Footer';

export default function Meals() {
  const { resultsApiContext } = useContext(AppContext);
  const renderLimit = 12;
  const history = useHistory();
  const drawSearchIcon = true;

  const drawHeader = () => {
    if (history.location.pathname === '/meals') {
      return true;
    }
  };

  return (
    <>
      <div>
        {drawHeader() ? <Header title="Meals" hasSearchIcon={ drawSearchIcon } /> : null}
        { resultsApiContext.meals !== null && resultsApiContext.meals
          .slice(0, renderLimit).map((meal, index) => (
            <RecipeCard
              key={ index }
              recipeName={ meal.strMeal }
              recipeImg={ meal.strMealThumb }
              recipeId={ index }
            />
          )) }
      </div>
      {
        drawHeader() ? <Footer /> : null
      }
    </>
  );
}
