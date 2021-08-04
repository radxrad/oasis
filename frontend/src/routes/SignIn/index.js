import React from "react";
import { Form, Button } from "react-bootstrap";
import history from "../../history";

export default function index() {
  function handleSignIn() {
    history.push("/user");
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
          onClick={() => handleSignIn()}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
}
