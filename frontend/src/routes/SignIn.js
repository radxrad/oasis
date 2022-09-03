import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {getStrapiURL} from "../lib/api";

export default function SignIn() {
  const [isSignedIn,setIsSignedIn] = useState(localStorage.getItem("user"));
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const handleUsername = (e)=> setUsername(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);

  async function handleSignIn(e) {
    e.preventDefault();

    // const options = {
    //   method: "POST",
    //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/signin",
    //   headers: { "Content-Type": "application/json", Prefer: "" },
    //   data: { email: "alice.smith@gmail.com", password: "1234" },
    // };
    //
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //     window.location.replace("/user");
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    await axios.post(getStrapiURL()+'/api/auth/local/', {
      identifier: username,
      password: password,
    }).then(response => {
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setLoggedIn(response.data)
    })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
  }

  return (
    <div className="signin light-bg max-window">
      <Form className="signup__container">
        <div className="signup__header">Sign In</div>
        <Form.Group>
          <Form.Control
            type="email"
            className="signup__textbox"
            placeholder="Email"
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
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </Button>
          <a href="/signup">New to OASIS? Sign up now</a>
        </div>
      </Form>
    </div>
  );
}
