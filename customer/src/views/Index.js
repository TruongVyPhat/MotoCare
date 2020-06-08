
import React, { useEffect } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import Tabs from "views/IndexSections/Tabs.js";
import { ToastProvider } from 'react-toast-notifications'
import ProductDetail from "views/examples/ProductDetail";

const Index = (props) => {
  useEffect (() => {
    document.body.classList.toggle("index-page");
  })
    return (
      <ToastProvider autoDismiss={true} placement="bottom-right">
        {props.data && (props.data === "MyTab") && <IndexNavbar /> }
        <div className="wrapper">
          {props.data && (props.data === "MyTab") && <PageHeader /> }

          <div className="main">
          <JavaScript/>
              {props.data && (props.data === "MyTab")  &&<Tabs /> }
              {props.data && (props.data === "product-detail")  &&<ProductDetail /> }
              <Typography />
          </div>
          {props.data && (props.data === "MyTab") && <Footer /> }
        </div>
      </ToastProvider>
    );
}

export default Index;
