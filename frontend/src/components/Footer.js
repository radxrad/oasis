import React from "react";
import paths from "paths";
import { ListGroup, Navbar, Nav, Container } from 'react-bootstrap';

function Footer() {
  return (
    <div className="footer">
      <Navbar id="footer-navbar">
        <Container>
          <Navbar.Brand>
            <img alt="oasis-logo" id="oasis-logo" src="oasis-logo.svg" />
            <img alt="radxrad-logo" id="radxrad-logo" src="radxrad-logo.svg" />
          </Navbar.Brand>
          <Nav id="footer-nav">
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/">Contact Us</Nav.Link>
            <Nav.Link href="/">Terms of Use</Nav.Link>
            <Nav.Link href="/">Privacy Policy</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="seperator"></div>
      <div>@2022 OASIS</div>

    </div>
  );
}

export default Footer;
