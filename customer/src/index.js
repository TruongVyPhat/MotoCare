
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProductDetail from "views/examples/ProductDetail";
import SuccessPayment from "views/IndexSections/SuccessPayment"
import Signin from "views/examples/Signin";
import MyCart from "views/IndexSections/Cart"
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/product" render={props => <Index {...props} data={'MyTab'}/>} />
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
