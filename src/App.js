import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import InProgress from './components/InProgress';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route exact component={ Login } path="/" />
      <Route exact component={ Recipes } path="/meals" />
      <Route exact component={ Recipes } path="/drinks" />
      <Route component={ Profile } path="/profile" />
      <Route component={ DoneRecipes } path="/done-recipes" />
      <Route component={ FavoriteRecipes } path="/favorite-recipes" />
      <Route component={ InProgress } path="/drinks/:id-da-receita/in-progress" />
    </Switch>
  );
}

export default App;
