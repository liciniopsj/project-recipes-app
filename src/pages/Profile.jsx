import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const drawSearchIcon = false;

  return (
    <>
      <Header title="Profile" hasSearchIcon={ drawSearchIcon } />
      <Footer />
    </>
  );
}
