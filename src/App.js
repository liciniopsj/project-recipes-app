import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
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
      <Route component={ InProgress } path="/meals/:id/in-progress" />
      <Route component={ InProgress } path="/drinks/:id/in-progress" />
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />

    </Switch>
  );
}

export default App;
