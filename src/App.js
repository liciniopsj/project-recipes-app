import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact component={ Login } path="/" />
    </Switch>
  );
}

export default App;
