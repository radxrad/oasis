import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import React from "react";
import MicroPub from "components/MicroPub";

export default function Home() {
  const text =
    "A micropub is a new way to rapidly share emerging science for single, validated results that include novel findings, negative and/or reproduced results, new methods, standards, common data elements or procedures.";
  const exampleMicroPub = {
    img: "https://dummyimage.com/145x190/000/fff.png",
    title: "Which vaccine, according to research is the safest?",
    text:
      "Cheese and biscuits cauliflower cheese cream cheese. Monterey jack fromage frais stilton everyone loves edam jarlsberg monterey jack st. agur blue cheese. Cheesy grin swiss cheesecake say cheese cheese triangles paneer smelly cheese stinking bishop. Blue castello halloumi emmental...",
    id: -1,
    authors: [
      {
        name: "John Appleseed",
        id: -1,
        img: "http://placekitten.com/20/20",
        link: "#",
      },
    ],
  };

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
            <Button className="btn--small" type="submit">
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
          <p className="preview__subtitle">Featured QUESTIONS AND MICROPUBS</p>
          <div className="mp-list">
            <MicroPub
              img={exampleMicroPub.img}
              authors={exampleMicroPub.authors}
              title={exampleMicroPub.title}
              text={exampleMicroPub.text}
              id={exampleMicroPub.id}
            ></MicroPub>
            <MicroPub
              img={exampleMicroPub.img}
              authors={exampleMicroPub.authors}
              title={exampleMicroPub.title}
              text={exampleMicroPub.text}
              id={exampleMicroPub.id}
            ></MicroPub>
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
