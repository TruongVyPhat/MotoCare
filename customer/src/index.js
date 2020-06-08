
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProductDetail from "views/examples/ProductDetail";
import SuccessPayment from "views/IndexSections/SuccessPayment"
import Signin from "views/examples/Signin";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components/product" render={props => <Index {...props} data={'MyTab'}/>} />
      <Route path="/components/success" render={props => <Index {...props} data={'Success'} />} />
      <Route
        path="/profile-page"
        render={props => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"> <RegisterPage/> </Route>
      />
      <Route
        path="/signin"
        render={props => <Signin {...props} />} 
      />
      <Route
        path="/my-cart"
        render={props => <Index {...props} data={'MyCart'} />}
      />
      <Route
        path="/product-detail/:id"
        render={props => <ProductDetail {...props} />}
      />
      <Route
        path="/success"
        render={props => <SuccessPayment {...props} />}
      />
      <Redirect from="/" to="/components/product" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
