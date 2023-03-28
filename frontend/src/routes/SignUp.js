import  React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import {createAPI, getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import { setToken } from "../lib/helpers";
import Spinner from "react-bootstrap/Spinner";

export default function SignUp() {
  const history = useHistory();
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();


    const handleUsernameChange = (e) => {
        stopEventPropagationTry(e);
        setUsername(e.target.value);
    };
    const handlepasswordChange = (e) => {
        stopEventPropagationTry(e);
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        stopEventPropagationTry(e);
        setEmail(e.target.value);
    };
    const stopEventPropagationTry = (event) => {
        if (event.target === event.currentTarget) {
            try {
                event.stopPropagation();
            } catch (e) {
                console.log(e);
            }

        }
    };
  async function handleSignUp(e) {
    e.preventDefault();
    setIsLoading(true);
    // const options = {
    //   method: "POST",
    //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/signup",
    //   headers: { "Content-Type": "application/json", Prefer: "" },
    //   data: {
    //     firstName: "Alice",
    //     lastName: "Smith",
    //     email: "alice.smith@gmail.com",
    //     password: "1234",
    //   },
    // };
      const userInput = JSON.stringify(
      {

          "username": username,
              "email": email,
          "password": password,

      }
      );
      const options = {
          method: "POST",
          url: getStrapiURL('/api/auth/local/register'),
          mode: "cors",
          headers: { "Content-Type": "application/json", Prefer: "" },
          data: userInput,
      };
    await axios
      .request(options)
      .then(function (response) {
          if (response.data?.error) {
              throw response.data?.error;
          }
        console.log(response.data);
          setToken(response.data.jwt);

          // set the user
          setUser(response.data.user);
          //message.success(`Welcome to Oasis  ${response.data.user.username}!`);
          history.push("/user");
      })
      .catch(function (error) {
        console.error(error);
          setError(error?.message ?? "Something went wrong!");
      });
  };


  return (

      <Form className="signup__container">
        <div className="signup__header">Join OASIS</div>
        <Form.Control
            label="Username"
            name="username"
            className="signup__textbox"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
        />
        <Form.Control
            type="email"
            label="email"
            name="email"
            className="signup__textbox"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
        />

        <Form.Control
          type="test"
          className="signup__textbox"
          placeholder="First Name"
        />
        <Form.Control
          type="test"
          className="signup__textbox"
          placeholder="Last name"
        />

        <Form.Control
          type="password"
          className="signup__textbox"
          placeholder="password"
          value={password}
          onChange={handlepasswordChange}
        />
        <div className="controls">
          <Button
            className="btn--lg"
            type="submit"
            onClick={(e) => handleSignUp(e)}
          >
            Sign Up  {isLoading && <Spinner size="small" />}
          </Button>
            <Link to="/signin">
                <li>Already have an account? Sign in here</li>
            </Link>

        </div>
      </Form>

  );
}
