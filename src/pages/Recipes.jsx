/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const history = useHistory();
  const [defaultCategory, setDefaultCategory] = useState({ meals: [], drinks: [] });
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
  }, []);

  const drawRoute = history.location.pathname === '/meals';

  return (
    <div>
      { drawRoute
        && (defaultCategory.drinks.length !== 0
        || defaultCategory.meals !== null) ? defaultCategory.meals
          .slice(0, renderLimit).map((cat, index) => (
            <button
              data-testid={ `${cat.strCategory}-category-filter` }
              key={ index }
            >
              { cat.strCategory }
            </button>
          ))
        : defaultCategory.drinks
          .slice(0, renderLimit).map((cat, index) => (
            <button
              data-testid={ `${cat.strCategory}-category-filter` }
              key={ index }
            >
              { cat.strCategory }
            </button>
          ))}
      {
        drawRoute ? <Meals /> : <Drinks />
      }
    </div>
  );
}

export default Recipes;
