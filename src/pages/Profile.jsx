import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const drawSearchIcon = false;

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" hasSearchIcon={ drawSearchIcon } />
      <div>
        <span
          data-testid="profile-email"
        >
          {JSON.parse(localStorage.getItem('user'))}
        </span>
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
