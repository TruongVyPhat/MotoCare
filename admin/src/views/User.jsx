import React, { useEffect, useState } from "react";
import axios from 'axios'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";


const Profile = () => {
  const [User , setUser] = useState({})
  
  useEffect(() => {
    let url = 'http://localhost:9000/api/users/me';
    axios.get(url, { headers: { authorization: localStorage.getItem('access_token') }})
    .then(res => {
      setUser(res.data.data);
    }).catch(error => {
      console.log(error.response.status);
      if(localStorage.getItem('access_token') === null) {
        window.location.href = "/signin"
      }
    });
  }, []);

  const onSubmit = ( data ) => {
    data.preventDefault();
    console.log(data.target[2].value);
    console.log(data.target[3].value);
    console.log(data.target[4].value);
  }

  return (
    <>
      <div className="content">
        <Row>
          {/* <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg")}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/mike.jpg")}
                    />
                    <h5 className="title">Chet Faker</h5>
                  </a>
                  <p className="description">@chetfaker</p>
                </div>
                <p className="description text-center">
                  "I like the way you work it <br />
                  No diggity <br />I wanna bag it up"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        12 <br />
                        <small>Files</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        2GB <br />
                        <small>Used</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        24,6$ <br />
                        <small>Spent</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Team Members</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        DJ Khaled <br />
                        <span className="text-muted">
                          <small>Offline</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/faces/joe-gardner-2.jpg")}
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        Creative Tim <br />
                        <span className="text-success">
                          <small>Available</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                          />
                        </div>
                      </Col>
                      <Col className="col-ms-7" xs="7">
                        Flume <br />
                        <span className="text-danger">
                          <small>Busy</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col> */}
          
          <Col >
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                {/* form action submit */}
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          readOnly
                          defaultValue={User.name}
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="7">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input 
                          readOnly 
                          defaultValue={User.email} 
                          placeholder="Email" 
                          type="email" 
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={User.address}
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          defaultValue={User.phone}
                          placeholder="Phone"
                          type="text"
                          pattern="[0-9]{10,11}"
                          title="10-11 Number"                            
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Date of birth</label>
                        <Input
                          defaultValue={User.date_of_birth}
                          placeholder="Date of birth"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update Profile
                        </Button>
                    </div>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="Warning"
                        >
                          Change Password
                        </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
    </>
  );  
}

export default Profile;
