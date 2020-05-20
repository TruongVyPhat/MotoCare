import React from 'react';
import './App.css';
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import Main from './views/mainpage/main'
import Profile from './views/mainpage/profile'
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
      <Route path="/main">
        <Main />
      </Route>
      <Route path="/Profile">
        <Profile />
      </Route>
      <Route path="/*">
        <Main />
      </Route>
    </Switch>
  );
}

export default App;
