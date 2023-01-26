import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Meal() {
  const location = useLocation();
  const id = location.key;
  return (
    <>
      <h1>Meal</h1>
      <Link to={ `/meals/${id}/in-progress` } />
    </>
  );
}
