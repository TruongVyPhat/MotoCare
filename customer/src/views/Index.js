
import React from "react";

// core components
import react, { useEffect, useState } from 'react'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import Tabs from "views/IndexSections/Tabs.js";
import Cart from "views/IndexSections/Cart"

const Index = (props) => {
  useEffect (() => {
    document.body.classList.toggle("index-page");
  })
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          {props.data && (props.data === "MyTab") && <PageHeader /> }

          <div className="main">
          <JavaScript/>
              {props.data && (props.data === "MyTab")  &&<Tabs /> }
              {props.data && (props.data === "MyCart") && <Cart /> }
              <Typography />
          </div>
          <Footer />
        </div>
      </>
    );
}

export default Index;
