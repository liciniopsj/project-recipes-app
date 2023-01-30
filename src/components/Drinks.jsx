import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { AppContext } from '../context/AppProvider';
import Footer from './Footer';

export default function Drinks() {
  const { resultsApiContext } = useContext(AppContext);
  const [dataDefault, setDataDefault] = useState();
  const renderLimit = 12;
  const history = useHistory();
  const drawSearchIcon = true;

  useEffect(() => {
    const fetchDefaultApi = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const data = await request.json();
      setDataDefault(data.drinks);
    };
    fetchDefaultApi();
  }, []);

  const drawHeader = () => {
    if (history.location.pathname === '/drinks') {
      return true;
    }
  };

  if (!dataDefault) {
    return <p>Carregando...</p>;
  }
  return (
    <>
      <div>
        {drawHeader() ? <Header title="Drinks" hasSearchIcon={ drawSearchIcon } /> : null}
        <div>
          { resultsApiContext.drinks === null
            || resultsApiContext.drinks.length === 0 ? dataDefault
              .slice(0, renderLimit).map((drink, index) => (
                <RecipeCard
                  key={ index }
                  recipeName={ drink.strDrink }
                  recipeImg={ drink.strDrinkThumb }
                  recipeId={ index }
                />
              )) : resultsApiContext.drinks
              .slice(0, renderLimit).map((drink, index) => (
                <RecipeCard
                  key={ index }
                  recipeName={ drink.strDrink }
                  recipeImg={ drink.strDrinkThumb }
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
