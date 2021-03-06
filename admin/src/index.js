import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "views/auth/SignIn"
import SignUp from "views/auth/SignUp"
import { ToastContainer } from 'react-toastify';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from "layouts/Admin.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/">
        <SignIn />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect to="/dashboard" />
    </Switch>
    <ToastContainer
      position="bottom-right"
      autoClose={5000} 
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Router>,
  document.getElementById("root")
);
