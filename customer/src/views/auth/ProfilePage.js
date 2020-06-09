
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Form,Image,Modal} from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup'
import { string as yupstring, object as yupobject } from "yup";
import { useForm } from "react-hook-form";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  // Form,
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
import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footer/Footer.js";

const User = () => {
const [User, setUser] = useState({});
const [isreadOnly, setreadOnly] = useState(true);
const [isSubmit, setisSubmit] = useState(false);
const [open, setOpen] = useState(false),
    closeModal = () => setOpen(false),
    openModal = () => setOpen(true);

  const { register, errors} = useForm({
    validationSchema: LoginSchema
  });
let RoleName = null;
  
  useEffect(() => {
    axios.get(`http://localhost:9000/api/users/me`, { headers: { authorization: localStorage.getItem('access_token') } })
    .then(res => {
        console.log(res.data.data)
        setUser(res.data.data)
    }).catch(error => {
        console.log(error);
    });
  },[isSubmit]);

  const changeNameUserRole = () => 
  {
    if (User.role_id === 1){
      RoleName = "Admin"         
    }
    else if (User.role_id === 2){
      RoleName = "Staff"         
    }
    else if (User.role_id === 3){
      RoleName = "Customer"         
    }
    return(RoleName);
  }

  const handleClick = () => {
    setreadOnly(!isreadOnly)
  }

  const handleOnChange = (e) => {
    User[e.target.name] = e.target.value;
  }

  const handleSubmit = () => {
    const data = User;
    axios.put(`http://localhost:9000/api/users/update/${User.id}`, {data}, { headers: { authorization: localStorage.getItem('access_token') } })
    .then(res => {
      setisSubmit(!isSubmit);
      setreadOnly(true);
    }).catch(error => {
        console.log(error);
    });
  }

  const handleSave = () => {
    const data = User;
    axios.put(`http://localhost:9000/api/users/change-password/${User.id}`, {data}, { headers: { authorization: localStorage.getItem('access_token') } })
    .then(res => {
      setisSubmit(!isSubmit);
      setreadOnly(true);
    }).catch(error => {
        console.log(error);
    });
  }


  const LoginSchema = yupobject().shape({
    name: yupstring()
        .required()
        .matches(/[a-zA-Z]/),
    email: yupstring()
        .required()
        .email(),
    password: yupstring()
        .required()
        .min(8)
        .matches(/[a-zA-Z]/),
    passwordconfirm: yupstring()
    .oneOf([Yup.ref('password'), null])
    
});

 
    return (
      <>
        <Navbar />
        <div className="wrapper">
          <section className="section">
            <Container>
              <Row>
                <Col md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      <Image height = "200" width = "200" 
                        src={User.image ? User.image : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'}
                        wrapped
                        ui={true}
                      />
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={e=>{e.preventDefault();
                        handleSubmit()}}>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>User Name</label>
                              <Input readOnly={isreadOnly} defaultValue={User.name} type="text" onChange={(e)=>handleOnChange(e)} />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Email address</label>
                              <Input 
                                readOnly
                                value={User.email}
                                type="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                            <label for="exampleInputPassword1">Password</label>
                              <Input readOnly name="password" defaultValue={User.password} type="password" onChange={(e)=>handleOnChange(e)}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Phone Number</label>
                              <Input readOnly={isreadOnly} name="phone" defaultValue={User.phone} type="phone" onChange={(e)=>handleOnChange(e)}/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Date of Birth</label>
                              <Input readOnly={isreadOnly} name="date_of_birth" defaultValue={User.date_of_birth} type="date" onChange={(e)=>handleOnChange(e)}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Role</label>
                              <Input readOnly defaultValue={changeNameUserRole(RoleName)} type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Address</label>
                              <Input readOnly={isreadOnly} name="address" defaultValue={User.address} onChange={e => handleOnChange(e)} type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                        <Col md = "4">
                            <Modal   
                              trigger={<Button
                                className="btn-round float-right"
                                color="primary"
                                data-placement="right"
                                type="button"
                                onClick={openModal}
                              > Change Password
                              </Button>} open={open} onClose={closeModal}
                             >
                              <Modal.Header>Change Password</Modal.Header>
                                <Modal.Content>
                                  <Form onSubmit={e=>{e.preventDefault(); handleSave()}}>
                                    <Form.Field error={!!errors.password}>
                                      <label>Old Password</label>
                                      <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        inputRef={register}
                                        error={errors.password ? true : false}
                                        helperText={errors.password ? "Password is at least 8 characters and there are no special characters" : ""}
                                      />
                                    </Form.Field>
                                    <Form.Field>
                                      <label>New Password</label>
                                      <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        inputRef={register}
                                        error={errors.password ? true : false}
                                        helperText={errors.password ? "Password is at least 8 characters and there are no special characters" : ""}
                                      />
                                    </Form.Field>
                                  </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                  <Button type={"submit"} color={"blue"}>
                                    Save
                                  </Button>
                                  <Button type={"button"} color={"red"}>
                                    Cancel
                                  </Button>
                                </Modal.Actions>
                              </Modal>
                          </Col>
                          <Col md = "4">
                            {!isreadOnly && <Button
                              className="btn-round float-right"
                              color="primary"
                              data-placement="right"
                              id="tooltip341148792"
                              type="submit"
                            >
                              Save
                            </Button>}
                          </Col>
                          <Col md = "4">
                            <Button
                              className="btn-round float-right"
                              color="primary"
                              data-placement="right"
                              id="tooltip877922017"
                              type="button"
                              onClick= {handleClick}
                            >
                              {isreadOnly? "Edit Profile" : "Cancel"}
                            </Button>
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
