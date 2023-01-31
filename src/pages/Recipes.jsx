import React from 'react';
import { useHistory } from 'react-router-dom';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const history = useHistory();
  const drawRoute = history.location.pathname === '/meals';
  return (
    <div>
      {drawRoute === true ? <Meals /> : <Drinks />}
    </div>
  );
}

export default Recipes;
