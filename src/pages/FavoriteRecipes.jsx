import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const drawSearchIcon = false;

  return (
    <Header title="Favorite Recipes" hasSearchIcon={ drawSearchIcon } />
  );
}
