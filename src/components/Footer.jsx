import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();

  // CSS
  const footerStyle = {
    position: 'fixed',
    bottom: '0px',
  };

  return (
    <footer
      data-testid="footer"
      style={ footerStyle }
    >
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        src={ drinkIcon }
        alt="Drink icon"
        onClick={ () => history.push('/drinks') }
      />
      <input
        data-testid="meals-bottom-btn"
        type="image"
        src={ mealIcon }
        alt="Meals icon"
        onClick={ () => history.push('/meals') }
      />
    </footer>
  );
}

export default Footer;
