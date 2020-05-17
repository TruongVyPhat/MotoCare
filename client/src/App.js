import React from 'react';
import './App.css';
import SignIn from './Client/SignIn'
import SignUp from './Client/SignUp'
import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <>

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
    </Switch>
    </>
  );
}

export default App;
