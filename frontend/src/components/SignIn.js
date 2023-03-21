import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import {getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../lib/helpers";

export default function SignInDialog() {
  const [isSignedIn,setIsSignedIn] = useState(false);
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  //const [user, setUser] = useState(localStorage.getItem("user"));
  const handleUsername = (e)=> setUsername(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);
  //const navigate = useNavigate();
  const history = useHistory();
  const { setUser } = useAuthContext();

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
          history.push("/user");
        })
            .catch(error => {
              console.error(error);
              setError(error?.message ?? "Something went wrong!");
            }).finally( ()=>
            {setIsLoading(false);
            });
    //   const response = await fetch(getStrapiURL("/api/auth/local/")
    //   , {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(value),
    //   });
    //
    //   const data = await response.json();
    //   if (data?.error) {
    //     throw data?.error;
    //   } else {
    //     // set the token
    //     setToken(data.jwt);
    //
    //     // set the user
    //     setUser(data.user);
    //
    //     Alert.success(`Welcome back ${data.user.username}!`);
    //
    //    // navigate("/profile", { replace: true });
    //     history("/profile");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setError(error?.message ?? "Something went wrong!");
    // } finally {
    //   setIsLoading(false);
    // }
  };
  // async function handleSignIn(e) {
  //   e.preventDefault();
  //
  //   // const options = {
  //   //   method: "POST",
  //   //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/signin",
  //   //   headers: { "Content-Type": "application/json", Prefer: "" },
  //   //   data: { email: "alice.smith@gmail.com", password: "1234" },
  //   // };
  //   //
  //   // axios
  //   //   .request(options)
  //   //   .then(function (response) {
  //   //     console.log(response.data);
  //   //     localStorage.setItem("user", JSON.stringify(response.data));
  //   //     window.location.replace("/user");
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.error(error);
  //   //   });
  //   await axios.post(getStrapiURL()+'/api/auth/local/', {
  //     identifier: username,
  //     password: password,
  //   }).then(response => {
  //     console.log('User profile', response.data.user);
  //     console.log('User token', response.data.jwt);
  //     setIsSignedIn(true);
  //     setUser(response.data);
  //   })
  //       .catch(error => {
  //         console.log('An error occurred:', error.response);
  //       });
  // }  <Form className="popup">
    //       <Form.Group className="inputs">

  return (

      <Form className="popup signup__container">
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

  );
}
