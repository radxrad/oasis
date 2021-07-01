import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import React from "react";

export default function Home() {
  const text =
    "Squirty cheese queso emmental. Goat cheese triangles hard cheese camembert de normandie fondue hard cheese macaroni cheese croque monsieur. Airedale ricotta chalk and cheese camembert de normandie everyone loves parmesan bocconcini when the cheese comes out everybody's happy. Cut the cheese cheese slices squirty cheese boursin fromage stilton macaroni cheese cheese on toast. Roquefort.Lancashire monterey jack pepper jack. St. agur blue cheese port-salut gouda cheesy grin lancashire port-salut camembert de normandie cut the cheese. Cream cheese emmental rubber cheese lancashire rubber cheese mozzarella bocconcini cheeseburger. ";
  return (
    <div className="home">
      <Container>
        <Row className="header">
          <div className="headlines">
            <div className="headline--black mb-4">
              <b>Get</b> and <b>Share</b> rapid science micropubs for COVID-19
            </div>
            <div className="headline--blue mb-2">
              <b>Get</b> answers on the latest research from other experts in
              the field.
            </div>
            <div className="headline--blue">
              <b>Share</b> your research with the world through
              micro-publications.
            </div>
          </div>
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
            <Button className="button button--small" type="submit">
              Sign Up
            </Button>
          </Form>
        </Row>

        <Row className="preview">
          <div className="preview__subtitle">What is a MICROPUB?</div>
          <Card>
            <Card.Body>
              <Card.Text>{text}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row className="preview">
          <div className="preview__subtitle">
            Featured QUESTIONS AND MICROPUBS
          </div>
        </Row>

        <Row className="preview">
          <div className="preview__subtitle">
            Questions Inspired by Stories from the pandemic
          </div>
        </Row>
      </Container>
    </div>
  );
}
