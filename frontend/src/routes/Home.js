import { Button, Form, Container, Row, Card } from "react-bootstrap";
import React from "react";
import MicropubCard from "components/MicropubCard";
import text from "text.json";
import history from "history.js";

export default function Home() {
  const example = text.micropub;

  return (
    <div className="home light-bg">
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
            <Button
              className="btn--md"
              type="submit"
              onClick={() => history.push("/user")}
            >
              Sign Up
            </Button>
          </Form>
        </Row>

        <Row className="preview">
          <div className="preview__subtitle">What is a MICROPUB(LICATION)?</div>
          <Card>
            <Card.Body>
              <Card.Text>{text.intro}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row className="preview">
          <p className="preview__subtitle">Featured QUESTIONS AND MICROPUBS</p>
          <div className="mp-list">
            <MicropubCard
              img={example.img}
              authorIds={example.authorIds}
              title={example.title}
              abstract={example.abstract}
              uid={example.uid}
            ></MicropubCard>
            <MicropubCard
              img={example.img}
              authorIds={example.authorIds}
              title={example.title}
              abstract={example.abstract}
              uid={example.uid}
            ></MicropubCard>
          </div>
        </Row>
        {/* 
        <Row className="preview">
          <div className="preview__subtitle">
            Questions Inspired by Stories from the pandemic
          </div>
        </Row> */}
      </Container>
    </div>
  );
}
