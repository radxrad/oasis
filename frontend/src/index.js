import "./css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import Home from "routes/Home";
import paths from "routes/paths";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import User from "routes/User";
import Read from "routes/Read";
import history from "./history";
import Publish from "routes/Publish";
import * as serviceWorker from "./serviceWorker";
import { Navbar, Nav } from "react-bootstrap";
import Test from "routes/Test";

ReactDOM.render(
  <Router history={history}>
    <Navbar className="custom-nav" sticky="top">
      <Navbar.Brand className="navbar__brand" href="./">
        OASIS
      </Navbar.Brand>
      <Nav>
        <Nav.Link className="navbar__signin" href="./signin">
          Sign In
        </Nav.Link>
      </Nav>
    </Navbar>

    <Switch>
      <Route exact path={paths.home} component={Home} />
      <Route path={paths.signIn} component={SignIn} />
      <Route path={paths.signUp} component={SignUp} />
      <Route path={paths.user} component={User} />
      <Route path={paths.read} component={Read} />
      <Route path={paths.publish} component={Publish} />
      <Route path={paths.test} component={Test} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
