
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";
import { Rating } from 'semantic-ui-react'

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
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


const Product = ({ match }) => {
  let id = parseInt(match.params.id);
  console.log(id)
  const [Product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:9000/api/products/${id}`)
      .then(res => {
        console.log(res.data.data)
        setProduct(res.data.data);
      }).catch(error => {
        console.log(error);
      });
  }, [id,isChanged]);

  const [isChanged, setIsChanged] = useState(false)

  const handleAddtoCart = () => {
		if(window.localStorage.getItem('myCart') !== null){
			let same = 0;
			var oldCart = JSON.parse(window.localStorage.getItem('myCart')) || [];
			console.log(oldCart.data.orders)
			for(let i=0; i< oldCart.data.orders.length;i++)
			{
				if(Product.id === oldCart.data.orders[i].id){
					oldCart.data.orders[i].quantity++
					same = 1;
				}
			}
			if(same === 0){
				let newItem = { 
					'id': Product.id,
					'name':Product.name,
					'image': Product.image,
					'quantity': 1,
					'sell_price': Product.sell_price
				}
				oldCart.data.orders.push(newItem)
			}
			window.localStorage.setItem("myCart",JSON.stringify(oldCart))
		}
		else if(window.localStorage.getItem('myCart') === null){
			window.localStorage.setItem("myCart",JSON.stringify({
				"data": {
					"discount":20,
					"orders": [
					{
						"id": Product.id,
						'name':Product.name,
						'image': Product.image,
						"quantity": 1,
						'sell_price': Product.sell_price
					}
					]
				}
			}))
    }
    setIsChanged(!isChanged)
	}

  return (
    <>
      <IndexNavbar />
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
                <h1 className="profile-title text-left">{Product.name}</h1>
                <div>Mô tả sản phẩm: </div>
                <p className="profile-description text-left">
                  {Product.description}
                </p>
                <div>Số lượng tồn: </div> <p>{Product.amount} bình</p>
                <br/>
                <Rating maxRating={5} defaultRating={4} icon='star' size='mini' />
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


export default Product;
