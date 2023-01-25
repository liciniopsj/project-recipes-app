import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  const drawSearchIcon = false;

  return (
    <Header title="Done Recipes" hasSearchIcon={ drawSearchIcon } />
  );
}
