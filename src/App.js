import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meal from './pages/Meal';
import Drink from './pages/Drink';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import InProgress from './components/InProgress';

function App() {
  return (
    <Switch>
      <Route exact component={ Login } path="/" />
      <Route component={ Recipes } path="/meals" />
      <Route component={ Recipes } path="/drinks" />
      <Route component={ Profile } path="/profile" />
      <Route component={ DoneRecipes } path="/done-recipes" />
      <Route component={ FavoriteRecipes } path="/favorite-recipes" />
      <Route component={ InProgress } path="/drinks/:id-da-receita/in-progress" />
      <Route component={ Meal } path="/meals/:id-da-receita" />
      <Route component={ Drink } path="/drinks/:id-da-receita" />
    </Switch>
  );
}

export default App;
