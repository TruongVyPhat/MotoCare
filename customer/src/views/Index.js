
import React from "react";

// core components
import react, { useEffect, useState } from 'react'
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import MyTabs from "views/IndexSections/MyTabs.js";
import MyCart from "views/IndexSections/MyCart"

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
              {props.data && (props.data === "MyTab")  &&<MyTabs /> }
              {props.data && (props.data === "MyCart") && <MyCart /> }
              <Typography />
          </div>
          <Footer />
        </div>
      </>
    );
}

export default Index;
