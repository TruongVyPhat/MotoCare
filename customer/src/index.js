
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProductDetail from "views/examples/ProductDetail";
import MyCart from "views/IndexSections/MyCart"
import Signin from "views/examples/Signin";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={props => <Index {...props} />} />
      <Route
        path="/landing-page"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"> <RegisterPage/> </Route>
      />
      <Route
        path="/signin"
        render={props => <Signin {...props} />} />
      <Route
        path="/my-cart"
        render={props => <MyCart {...props} />}
      />
      <Route
        path="/product-detail/:id"
        render={props => <ProductDetail {...props} />}
      />
      <Redirect from="/" to="/components" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
