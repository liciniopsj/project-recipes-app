import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { AppContext } from '../context/AppProvider';
import Footer from './Footer';

export default function Drinks() {
  const { resultsApiContext } = useContext(AppContext);
  // console.log(resultsApiContext);
  const renderLimit = 12;
  const history = useHistory();
  const drawSearchIcon = true;

  const drawHeader = () => {
    if (history.location.pathname === '/drinks') {
      return true;
    }
  };

  return (
    <>
      <div>
        {
          drawHeader() ? <Header title="Drinks" hasSearchIcon={ drawSearchIcon } /> : null
        }
        { resultsApiContext.drinks !== null && resultsApiContext.drinks
          .slice(0, renderLimit).map((drink, index) => (
            <RecipeCard
              key={ index }
              recipeName={ drink.strDrink }
              recipeImg={ drink.strDrinkThumb }
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