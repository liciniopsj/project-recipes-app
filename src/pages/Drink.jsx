import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Drink() {
  const location = useLocation();
  const id = location.key;
  return (
    <>
      <h1>Drink</h1>
      <Link to={ `/drinks/${id}/in-progress` } />
    </>
  );
}
