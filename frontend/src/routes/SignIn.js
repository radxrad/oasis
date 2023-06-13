import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import {getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../lib/helpers";

export default function SignIn(props) {
    const history = useHistory();
    const { setUser } = useAuthContext();
    let location = useLocation();
  let { from } = location.state || { from: { pathname: "/user" } };
  const [isSignedIn,setIsSignedIn] = useState(false);
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  //const [user, setUser] = useState(localStorage.getItem("user"));
  const handleUsername = (e)=> setUsername(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);
  //const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const onFinish =  async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // try {
    //   const value = {
    //     identifier: username,
    //     password: password,
    //   };
    const options = {
          method: "POST",
          url: getStrapiURL('/api/auth/local/'),
        mode: "cors",
          headers: { "Content-Type": "application/json", Prefer: "" },
          data: {
            identifier: username,
            password: password,
          },
        };
     return   axios.request(options).then(response => {
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
          setIsSignedIn(true);
          setToken(response.data.jwt);

          // set the user
          setUser(response.data.user);

        //  Alert.success(`Welcome back ${response.data.user.username}!`);

          // navigate("/profile", { replace: true });
          history.push(from);
        })
            .catch(error => {
              console.error(error);
              setError(error?.message ?? "Something went wrong!");
            }).finally( ()=>
            {setIsLoading(false);
            });

  };


  return (
      <Fragment>
    <div className="signin light-bg max-window">
      <Form className="signup__container">
        <div className="signup__header">Sign In</div>
        <Form.Group>
          <Form.Control
            type="email"
            className="signup__textbox"
            placeholder="username"
            value={username}
            onChange={handleUsername}
          />
          <Form.Control
            type="password"
            className="signup__textbox"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <div className="controls">
          <Button
            className="btn--lg"
            type="submit"
            onClick={onFinish}
          >
            SignIn {isLoading && <Spinner size="small" />}
          </Button>
          <a href="/signup">New to OASIS? Sign up now</a>
        </div>
      </Form>
    </div>
      </Fragment>
  );
}
