/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import { AppContext } from '../context/AppProvider';

function Recipes() {
  const history = useHistory();
  const { resultsApiContext, setResultsApiContext } = useContext(AppContext);
  const [defaultCategory, setDefaultCategory] = useState({ meals: [], drinks: [] });
  const [renderCateg, setRenderCateg] = useState(false);
  const renderLimit = 5;

  useEffect(() => {
    const fetchDefaultCategory = async () => {
      const domain = (
        history.location.pathname === '/meals' ? 'themealdb' : 'thecocktaildb');
      const url = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
      const request = await fetch(url);
      const data = await request.json();
      console.log('DATA', data);
      setDefaultCategory({ ...defaultCategory, ...data });
      console.log('CATEGORY', defaultCategory);
    };
    fetchDefaultCategory();
  }, [history.location.pathname]);

  const drawRoute = history.location.pathname === '/meals';

  const handleCategButton = async ({ target }) => {
    const domain = (
      history.location.pathname === '/meals' ? 'themealdb' : 'thecocktaildb');
    setRenderCateg(true);
    if (renderCateg === false) {
      const url = (`https://www.${domain}.com/api/json/v1/1/filter.php?c=${target.value}`);
      const response = await fetch(url);
      const data = await response.json();
      setResultsApiContext({ ...resultsApiContext, ...data });
    } else {
      setRenderCateg(false);
      setResultsApiContext({ meals: [], drinks: [] });
    }
  };

  return (
    <div>
      { drawRoute
        && (defaultCategory.drinks.length !== 0
        || defaultCategory.meals !== null) ? defaultCategory.meals
          .slice(0, renderLimit).map((cat, index) => (
            <button
              data-testid={ `${cat.strCategory}-category-filter` }
              key={ index }
              type="button"
              value={ cat.strCategory }
              name="category-button"
              onClick={ (e) => handleCategButton(e) }
            >
              { cat.strCategory }
            </button>
          ))
        : defaultCategory.drinks
          .slice(0, renderLimit).map((cat, index) => (
            <button
              data-testid={ `${cat.strCategory}-category-filter` }
              key={ index }
              type="button"
              value={ cat.strCategory }
              name="category-button"
              onClick={ (e) => handleCategButton(e) }
            >
              { cat.strCategory }
            </button>
          ))}
      <button
        data-testid="All-category-filter"
        type="button"
        name="reset-category-button"
        onClick={ () => setResultsApiContext({ meals: [], drinks: [] }) }
      >
        All
      </button>
      {
        drawRoute ? <Meals /> : <Drinks />
      }
    </div>
  );
}

export default Recipes;
