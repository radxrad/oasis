import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import AddQuestion from "components/AddQuestion";
//import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../lib/helpers";

export default function CustomNavbar(props) {
    const { user } = useAuthContext();
    //const navigate = useNavigate();
    const history = useHistory();
  // function handleSignOut() {
  //   localStorage.clear();
  //   window.location.replace("/");
  // }
    const handleLogout = () => {
        removeToken();
        history.push('/signin');
       // navigate("/signin", { replace: true });
    };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (!user)
    return (
      <Navbar className="custom-nav" sticky="top">
        <Navbar.Brand className="navbar__brand" href="./">
          <img src="/oasis-logo-blue.svg"/>
        </Navbar.Brand>
        <Nav>
          <Nav.Link className="navbar__signin" href="./signin">
            Sign In
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  else {
    return (
      <Navbar className="custom-nav" sticky="top">
        <Modal show={show} onHide={handleClose}>
          <AddQuestion close={handleClose} />
        </Modal>
        <Navbar.Brand className="navbar__brand" href="./">
          OASIS
        </Navbar.Brand>
        <Nav>
          <Form className="searchbar">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="dark">
              <BsSearch />
            </Button>
          </Form>
        </Nav>

        <DropdownButton
          className="user-avatar"
          as={ButtonGroup}
          align={{ lg: "end" }}
          title={
            <img
              src={ user?.picture ? (user?.picture?.url) : ("https://source.unsplash.com/random") }
              drop="down"
              variant="light"
              alt="user avatar"
            />
          }
        >
          <Dropdown.Item href="/user">My Page</Dropdown.Item>
          <Dropdown.Item href="/publish">Publish</Dropdown.Item>
          <Dropdown.Item onClick={handleShow}>Ask</Dropdown.Item>
          <Dropdown.Item href="/settings">Settings</Dropdown.Item>
          <Dropdown.Item onClick={() => handleLogout()}>
            Sign Out
          </Dropdown.Item>
        </DropdownButton>
      </Navbar>
    );
  }
}
