
import React from "react";


// reactstrap components
import {
  Container,
  Row,
  UncontrolledCarousel
} from "reactstrap";

const carouselItems = [
  {
    src: require("assets/img/rsz_washbike.jpg"),
    altText: "Slide 1",
    caption: ""
  },
  {
    src: require("assets/img/rsz_castrol.jpg"),
    altText: "Slide 2",
    caption: ""
  },
  {
    src: require("assets/img/rsz_change-oil.jpg"),
    altText: "Slide 3",
    caption: ""
  },
  {
    src: require("assets/img/rsz_oil-change.jpg"),
    altText: "Slide 4",
    caption: ""
  }
];

class JavaScript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoModal: false,
      miniModal: false,
      formModal: false
    };
  }
  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  render() {
    return (
      <div className="section section-javascript" id="javascriptComponents">
        <img alt="..." className="path" src={require("assets/img/path5.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path5.png")}
        />
        <div className="section">
            <Container>
                <Row className="justify-content-between align-items-center">
              
                    <UncontrolledCarousel
                      items={carouselItems}
                      indicators={false}
                      autoPlay={true}
                    />
                </Row>
            </Container>
        </div>
      </div>
    );
  }
}

export default JavaScript;
