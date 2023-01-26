import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Meals() {
  const history = useHistory();
  const drawSearchIcon = true;

  const drawHeader = () => {
    if (history.location.pathname === '/meals') {
      return true;
    }
  };

  return (
    drawHeader() ? <Header title="Meals" hasSearchIcon={ drawSearchIcon } /> : null
  );
}
