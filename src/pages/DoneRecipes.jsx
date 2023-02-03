import React from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

export default function DoneRecipes() {
  const drawSearchIcon = false;
  // const mockDoneRecipesStorage = [
  //   {
  //     id: '12345',
  //     type: 'drink',
  //     nationality: 'who knows ?',
  //     category: 'Whiskey',
  //     alcoholicOrNot: 'Very alcoholic',
  //     name: 'Fireball',
  //     image: 'https://www.planetaaguaadega.com.br/uploads/img/whisky-fireball-750-ml-72161f7c6b6d40d6ec0b9007ee7aec1e.jpg',
  //     doneDate: '03/02/2023',
  //     tags: ['THE', 'WORST', 'WHISKEY', 'EVER', 'MADE'],
  //   }];

  return (
    <>
      <Header title="Done Recipes" hasSearchIcon={ drawSearchIcon } />

      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        ALL
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <DoneRecipesCard doneRecipes={ JSON.parse(localStorage.getItem('doneRecipes')) } />

    </>
  );
}
