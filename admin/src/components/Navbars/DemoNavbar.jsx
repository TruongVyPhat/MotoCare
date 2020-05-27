import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

import routes from "routes.js";
import axios from "axios"

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("transparent");

  const sidebarToggle = React.createRef();

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  }

  const dropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)


  useEffect(() => {
    if (localStorage.getItem('access_token') === null || localStorage.getItem('role_id') === null) {
      window.location.href = "/signin"
    } else {
      let url = 'http://localhost:9000/api/users/me';
      axios.get(url, { headers: { authorization: localStorage.getItem('access_token') } })
        .then(res => {
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("access_token")
            localStorage.removeItem("role_id")
            window.location.href = "/signin"
          }
        })
    }
    const updateColor = () => {
      if (window.innerWidth < 993 && isOpen) {
        setColor("dark");
      } else {
        setColor("transparent");
      }
    }

    window.addEventListener("resize", updateColor());
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [isOpen, sidebarToggle]);

  const handleLogoutIN = () => {
    if (localStorage.getItem('access_token') === null) {
      window.location.href = "/signin"
    }
    else {
      const url = 'http://localhost:9000/api/auth/logout';
      axios.delete(url, { headers: { authorization: localStorage.getItem('access_token') } })
        .then(res => {
          console.log("Delete accesstoken success")
        }).catch(error => {
          console.log(error);
        });
      localStorage.removeItem("access_token")
      localStorage.removeItem("role_id")
      window.location.href = "/signin"
    }
  }
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        window.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        window.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
          (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={openSidebar}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse
          isOpen={isOpen}
          navbar
          className="justify-content-end"
        >
          <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            <NavItem>
              <Link to="#pablo" className="nav-link btn-magnify">
                <i className="nc-icon nc-layout-11" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={e => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-bell-55" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a">Action</DropdownItem>
                <DropdownItem tag="a">Another Action</DropdownItem>
                <DropdownItem tag="a">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <Link to="#pablo" className="nav-link btn-rotate">
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="#" onClick={handleLogoutIN} className="nav-link btn-rotate">
                <i className="nc-icon nc-button-power" />
                <p>
                  <span className="d-lg-none d-md-block">Log Out</span>
                </p>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
