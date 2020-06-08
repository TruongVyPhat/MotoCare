
import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

class Typography extends React.Component {
  render() {
    return (
      <div className="section section-typo">
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path3.png")}
        />
        <Container>
          <div className="space-50" />
          <div id="images">
            <h3 className="mb-5">FOUNDER</h3>
            <Row>
              <Col sm="3" xs="6">
                <small className="d-block text-uppercase font-weight-bold mb-4">
                  Frontend 
                </small>
                <img
                  alt="..."
                  className="img-fluid rounded shadow"
                  src={require("assets/img/ryan.jpg")}
                  style={{ width: "150px" }}
                />
              </Col>
              <Col sm="3" xs="6">
                <small className="d-block text-uppercase font-weight-bold mb-4">
                  Backend
                </small>
                <img
                  alt="..."
                  className="img-fluid rounded-circle shadow"
                  src={require("assets/img/james.jpg")}
                  style={{ width: "150px" }}
                />
              </Col>
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <small className="d-block text-uppercase font-weight-bold mb-4">
                  Tester
                </small>
                <img
                  alt="..."
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/lora.jpg")}
                  style={{ width: "150px" }}
                />
              </Col>
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <small className="d-block text-uppercase font-weight-bold mb-4">
                  Our Partner
                </small>
                <img
                  alt="..."
                  className="img-fluid rounded-circle shadow-lg"
                  src={require("assets/img/mike.jpg")}
                  style={{ width: "150px" }}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Typography;
