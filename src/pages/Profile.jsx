import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const drawSearchIcon = false;
  const storage = localStorage.getItem('user');
  const { email } = storage !== null && (JSON.parse(storage));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <div>
        <Header title="Profile" hasSearchIcon={ drawSearchIcon } />
      </div>
      <div>
        <span data-testid="profile-email">{email}</span>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
