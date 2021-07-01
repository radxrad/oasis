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
import ResearcherProfile from "routes/ResearcherProfile";
import history from "./history";
import store from "store/configureStore";
import * as serviceWorker from "./serviceWorker";
import Micropub from "routes/Micropub";
import ReactGA from "react-ga";
import { Navbar, Button, Form, FormControl } from "react-bootstrap";
import PublicProfile from "routes/PublicProfile";

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
        <Navbar className="custom-nav" fixed="top">
          <Navbar.Brand className="navbar__brand" href="#">
            OASIS
          </Navbar.Brand>
          <Button
            className="button button--small button--white navbar__signin"
            variant="primary"
          >
            Sign In
          </Button>
        </Navbar>

        <Switch>
          <Route exact path={paths.home} component={Home} />
          <Route path={paths.micropub} component={Micropub} />
          <Route path={paths.signIn} component={SignIn} />
          <Route path={paths.signUp} component={SignUp} />
          <Route path={paths.researcher} component={ResearcherProfile} />
          <Route path={paths.myStory} component={MyStory} />
          <Route path={paths.public} component={PublicProfile} />
          <Route path={paths.storyHistory} component={StoryHistory} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
