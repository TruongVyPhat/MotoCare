import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.onHide}>
                        Save Changes
                    </Button>
                </Modal.Footer>
        </Modal>
    );
}


function Header() {

    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const handleCloseProfile = () => setShow(false);
    const handleShowProfile = () => setShow(true);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand href="#home">Moto Care</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Account" drop="left" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={handleShowProfile}>Profile</NavDropdown.Item>
                            <NavDropdown.Item  onClick={() => setModalShow(true)}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleCloseProfile}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProfile}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseProfile}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Header;