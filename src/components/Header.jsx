import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearchIcon }) {
  const history = useHistory();
  const [searchSwitch, setSearchSwitch] = useState(false);

  return (
    <header>
      <input
        id="profileBtn"
        data-testid="profile-top-btn"
        type="image"
        aria-label="profile-icon"
        src={ profileIcon }
        onClick={ () => history.push('/profile') }
      />
      {

        hasSearchIcon
          ? (
            <>
              <input
                data-testid="search-top-btn"
                type="image"
                src={ searchIcon }
                alt=""
                onClick={ () => setSearchSwitch(!searchSwitch) }
              />

              {
                searchSwitch
                  ? (
                    <input
                      data-testid="search-input"
                      type="search"
                    />
                  ) : null
              }

            </>
          )
          : null
      }

      <h1 data-testid="page-title">{ title }</h1>
    </header>

  );
}

Header.propTypes = {
  hasSearchIcon: PropTypes.bool,
}.isRequired;

export default Header;
