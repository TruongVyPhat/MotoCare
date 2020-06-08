
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Image} from 'semantic-ui-react';

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
  UncontrolledTooltip
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";


let ps = null;

const User = () => {
const [User, setUser] = useState({});
const [readOnly, setreadOnly] = useState(true);
let RoleName = null;
  
  useEffect(() => {
    axios.get(`http://localhost:9000/api/users/me`, { headers: { authorization: localStorage.getItem('access_token') } })
    .then(res => {
        console.log(res.data.data)
        setUser(res.data.data)
    }).catch(error => {
        console.log(error);
    });
  },[localStorage.getItem('access_token')]);

  const changeNameUserRole = () => 
  {
    if (User.role_id === 1){
      RoleName = "Admin"         
    }
    else if (User.role_id === 2){
      RoleName = "Staff"         
    }
    else if (User.role_id === 2){
      RoleName = "Customer"         
    }
    return(RoleName);
  }

  const handleClick = () => {
    // <Input readOnly={false} placeholder={User.name} type="text" />
    // <Input readOnl placeholder={User.email} type="email"/>
  }


    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <section className="section">
            <Container>
              <Row>
                <Col md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      {/* <h1 className="User-title text-left">Contact</h1> */}
                      <Image height = "200" width = "200" 
                        src={User.image ? User.image : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'}
                        wrapped
                        ui={true}
                      />
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>User Name</label>
                              <Input readOnly placeholder={User.name} type="text" />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Email address</label>
                              <Input 
                                readOnly
                                placeholder={User.email}
                                type="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                            <label for="exampleInputPassword1">Password</label>
                              <Input readOnly defaultValue={User.password} type="password" />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Phone Number</label>
                              <Input readOnly placeholder={User.phone} type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Date of Birth</label>
                              <Input readOnly placeholder={User.date_of_birth} type="text" />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Role</label>
                              <Input readOnly placeholder={changeNameUserRole(RoleName)} type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Address</label>
                              <Input readOnly defaultValue={User.address} type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md = "6">
                            <Button
                              className="btn-round float-right"
                              color="primary"
                              data-placement="right"
                              id="tooltip877922017"
                              type="button"
                              onClick={handleClick()}
                            >
                              Edit Profile
                            </Button>
                            <UncontrolledTooltip 
                              delay={0} 
                              placement="right"
                              target="tooltip877922017">
                              Edit Your Profile Here!
                            </UncontrolledTooltip>
                          </Col>
                          <Col md = "6">
                            <Button
                              className="btn-round float-right"
                              color="primary"
                              data-placement="right"
                              id="tooltip341148792"
                              type="button"
                            >
                              Send For Us
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              placement="right"
                              target="tooltip341148792"
                            >
                              Send for us when you edited your information!
                            </UncontrolledTooltip>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="ml-auto" md="4">
                  <div className="info info-horizontal">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-square-pin" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Find us at the office</h4>
                      <p>
                      227 Nguyen Van Cu Street,  <br />
                        District 5, <br />
                        Ho Chi Minh City
                      </p>
                    </div>
                  </div>
                  <div className="info info-horizontal">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-mobile" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Give us a ring</h4>
                      <p>
                        Dang Duc Tai <br />
                        +84 762 321 762 <br />
                        Mon - Fri, 8:00-22:00
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <Footer />
        </div>
      </>
    );
}
export default User;
