import React from "react";
import { Form, Button } from "react-bootstrap";
import history from "../../history";

export default function index() {
  function handleSignUp() {
    history.push("/user");
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
          onClick={() => handleSignUp()}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
