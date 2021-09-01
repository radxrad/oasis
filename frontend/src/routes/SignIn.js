import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function SignIn() {
  async function handleSignIn(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://stoplight.io/mocks/oasis/oasis/19253909/signin",
      headers: { "Content-Type": "application/json", Prefer: "" },
      data: { email: "alice.smith@gmail.com", password: "1234" },
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
    <div className="signin light-bg max-window">
      <Form className="signup__container">
        <div className="signup__header">Sign In</div>
        <Form.Group>
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
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button
          className="btn--md"
          type="submit"
          onClick={(e) => handleSignIn(e)}
        >
          Sign In
        </Button>
        <a href="/signup">New to OASIS? Sign up now</a>
      </Form>
    </div>
  );
}
