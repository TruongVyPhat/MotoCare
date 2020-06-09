
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import ProfilePage from "views/auth/ProfilePage.js";
import RegisterPage from "views/auth/RegisterPage";
import ProductDetail from "views/products/ProductDetail";
import SuccessPayment from "views/payment/SuccessPayment"
import Signin from "views/auth/Signin";
import MyCart from "views/cart/Cart"
import Orders from "views/payment/Orders"
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/product" render={props => <Index {...props} data={'MyTab'} />} />
      <Route
        path="/profile-page"
        render={props => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"> <RegisterPage /> </Route>
      />
      <Route
        path="/signin"
        render={props => <Signin {...props} />}
      />
      <Route
        path="/my-cart"
        render={props => <MyCart {...props} />}
      />
      <Route
        path="/orders-page"
        render={props => <Orders {...props} />}
      />
      <Route
        path="/product-detail/:id"
        render={props => <ToastProvider autoDismiss={true} placement="bottom-right"><ProductDetail {...props} /></ToastProvider>}
      />
      <Route
        path="/success"
        render={props => <SuccessPayment {...props} />}
      />

      <Redirect from="/" to="/product" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
