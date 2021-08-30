import React, { useState } from "react";
import { Button, Col, ListGroup, Row, Container, Modal } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ListItem from "components/ListItem";
import Question from "components/Question";
import history from "history.js";
import text from "text.json";
import AddQuestion from "components/AddQuestion";

export default function User() {
  const user = { name: "User", id: -1, img: "http://placekitten.com/60/60" };
  const exampleQuestion = text.question;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="userpage">
      <Modal show={show} onHide={handleClose}>
        <AddQuestion close={handleClose} />
      </Modal>
      <Row className="max-window">
        <Col>
          <div className="welcome heading">
            <img src={user.img} alt="user-avatar" className="avatar--lg"></img>
            Welcome, {user.name}
          </div>
          <div className="block">
            <div className="heading">
              My Micropubs{" "}
              <Button
                className="btn--blue btn--lg"
                onClick={() => history.push("/publish")}
              >
                <BsFillPlusSquareFill />
                <span>Create a Micropub</span>
              </Button>
            </div>
            <ListGroup className="list-group--small">
              <ListItem
                type="micropub"
                title="Looking at vaccine hesitancy through Behavioural Economics"
              ></ListItem>
              <ListItem
                type="micropub"
                title="Looking at vaccine hesitancy through Behavioural Economics"
              ></ListItem>
              <ListItem
                type="micropub"
                title="Looking at vaccine hesitancy through Behavioural Economics"
              ></ListItem>
            </ListGroup>
          </div>

          <div className="block">
            <div className="heading">
              My Question & Answers
              <Button className="btn--blue btn--lg" onClick={handleShow}>
                <MdQuestionAnswer close={handleClose} />
                <span>Ask a Question</span>
              </Button>
            </div>
            <ListGroup className="list-group--small">
              <ListItem
                type="question"
                title="Looking at vaccine hesitancy through Behavioural Economics"
              ></ListItem>
              <ListItem
                type="answer"
                title="Looking at vaccine hesitancy through Behavioural Economics"
              ></ListItem>
              <ListItem
                type="question"
                title="Looking at vaccine hesitancy through Behavioural Economics"
              ></ListItem>
            </ListGroup>
          </div>
        </Col>
        <Col>
          <div className="block">
            <div className="heading">
              My Feeds
              <Button className="btn--blue btn--lg">
                Browse Open Questions
              </Button>
            </div>
            <ListGroup className="list-group--large">
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                uid={exampleQuestion.uid}
                ansNum={0}
              />
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                uid={exampleQuestion.uid}
                ansNum={0}
              />
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                uid={exampleQuestion.uid}
                ansNum={0}
              />
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                uid={exampleQuestion.uid}
                ansNum={0}
              />
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
