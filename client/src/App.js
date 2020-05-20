import React from 'react';
import './App.css';
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import Header from './views/menu/header'
import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <Switch>
    <Route exact path="/">
        <SignIn />
      </Route>
      <Route exact path="/Sign_in">
        <SignIn />
      </Route>
      <Route path="/Sign_up">
        <SignUp />
      </Route>
      <Route path="/Header">
        <Header />
      </Route>
    </Switch>
  );
}

export default App;
