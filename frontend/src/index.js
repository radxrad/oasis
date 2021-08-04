import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import Home from "routes/Home";
import MyStory from "routes/MyStory";
import paths from "routes/paths";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import StoryHistory from "routes/StoryHistory";
import User from "routes/User";
import Reading from "routes/Reading";
import history from "./history";
import store from "store/configureStore";
import Publish from "routes/Publish";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
import { Navbar, Nav } from "react-bootstrap";

const TRACKINGID = "UA-179246573-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(TRACKINGID);

// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
          <Route path={paths.myStory} component={MyStory} />
          <Route path={paths.storyHistory} component={StoryHistory} />
          <Route path={paths.reading} component={Reading} />
          <Route path={paths.publish} component={Publish} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
