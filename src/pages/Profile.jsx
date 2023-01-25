import React from 'react';
import Header from '../components/Header';

export default function Profile() {
  const drawSearchIcon = false;

  return (
    <Header title="Profile" hasSearchIcon={ drawSearchIcon } />
  );
}
