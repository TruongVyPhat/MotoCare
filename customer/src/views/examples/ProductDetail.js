
import React, { useState, useEffect } from "react";
import axios from 'axios';
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

const carouselItems = [
//   {
//     src: require("assets/img/denys.jpg"),
//     altText: "Slide 1",
//     caption: "Big City Life, United States"
//   },
  {
    src: require("assets/img/motul.jpg"),
    altText: "Slide 1",
    caption: ""
  }
//   {
//     src: require("assets/img/mark-finn.jpg"),
//     altText: "Slide 2",
//     caption: ""
//   }
];

let ps = null;


const ProductDetail = ({match}) => {
    let id = parseInt(match.params.id);
    console.log(id)
    const [ProductDetail, setListProductDetail] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:9000/api/products/${id}`)
        .then(res => {
            console.log(res.data.data)
            setListProductDetail(res.data.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);
//   componentDidMount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       document.documentElement.className += " perfect-scrollbar-on";
//       document.documentElement.classList.remove("perfect-scrollbar-off");
//       let tables = document.querySelectorAll(".table-responsive");
//       for (let i = 0; i < tables.length; i++) {
//         ps = new PerfectScrollbar(tables[i]);
//       }
//     }
//     document.body.classList.toggle("profile-page");
//   }
//   componentWillUnmount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps.destroy();
//       document.documentElement.className += " perfect-scrollbar-off";
//       document.documentElement.classList.remove("perfect-scrollbar-on");
//     }
//     document.body.classList.toggle("profile-page");
//   }
//   toggleTabs = (e, stateName, index) => {
//     e.preventDefault();
//     this.setState({
//       [stateName]: index
//     });
//   };
    return (
      <>
        <ExamplesNavbar/>
        <div className="wrapper">
          <div className="section">
            <Container style={{marginTop: "100px"}}>
              <Row className="justify-content-between">
                <Col md="6">
                  <Row className="justify-content-between align-items-center">
                    <UncontrolledCarousel items={carouselItems} indicators={false}/>
                  </Row>
                </Col>
                <Col md="5">
                  <h1 className="profile-title text-left">{ProductDetail.name}</h1>
                    <div>Mô tả sản phẩm: </div>
                  <p className="profile-description text-left">
                        {ProductDetail.description}
                  </p>
                  <div>Số lượng tồn: </div> <p>{ProductDetail.amount}</p> 
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-cart" /> Add to Cart
                    </Button>
                    <Button
                      className="btn-simple"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-bulb-63" /> Check it!
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <Footer />
        </div>
      </>
    );
  }


export default ProductDetail;
