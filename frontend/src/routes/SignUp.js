import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function SignUp() {
  async function handleSignUp(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://stoplight.io/mocks/oasis/oasis/19253909/signup",
      headers: { "Content-Type": "application/json", Prefer: "" },
      data: {
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@gmail.com",
        password: "1234",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.replace("/user");
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <div className="signup light-bg max-window">
      <Form className="signup__container">
        <div className="signup__header">Join OASIS</div>
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
          type="email"
          className="signup__textbox"
          placeholder="Email"
        />
        <Form.Control
          type="password"
          className="signup__textbox"
          placeholder="Password"
        />

        <Button
          className="btn--md"
          type="submit"
          onClick={(e) => handleSignUp(e)}
        >
          Sign Up
        </Button>
        <a href="/signin">Already have an account? Sign in here</a>
      </Form>
    </div>
  );
}
