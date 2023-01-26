import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Drinks() {
  const history = useHistory();
  const drawSearchIcon = true;

  const drawHeader = () => {
    if (history.location.pathname === '/drinks') {
      return true;
    }
  };

  return (
    drawHeader() ? <Header title="Drinks" hasSearchIcon={ drawSearchIcon } /> : null
  );
}
