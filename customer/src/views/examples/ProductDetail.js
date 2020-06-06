
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Button,
  Container,
  Row,
  Col,
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


const ProductDetail = ({ match }) => {
  let id = parseInt(match.params.id);
  console.log(id)
  const [ProductDetail, setListProductDetail] = useState({});

  const handleAddtoCart = () => {
    
  }

  useEffect(() => {
    axios.get(`http://localhost:9000/api/products/${id}`)
      .then(res => {
        console.log(res.data.data)
        setListProductDetail(res.data.data);
      }).catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="section">
          <Container style={{ marginTop: "100px" }}>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} indicators={false} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">{ProductDetail.name}</h1>
                <div>Mô tả sản phẩm: </div>
                <p className="profile-description text-left">
                  {ProductDetail.description}
                </p>
                <div>Số lượng tồn: </div> <p>{ProductDetail.amount} bình</p>
                <div className="btn-wrapper pt-3">
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#pablo"
                    onClick={e => {
                      e.preventDefault();
                      handleAddtoCart()
                    }}
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
