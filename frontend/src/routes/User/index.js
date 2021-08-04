import React from "react";
import { Button, Col, ListGroup, Row, Container } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ListItem from "components/ListItem";
import Question from "components/Question";

export default function index() {
  const user = { name: "User", id: -1, img: "http://placekitten.com/60/60" };
  const exampleQuestion = {
    title: "Which vaccine, according to research is the safest?",
    id: -1,
    asker: {
      name: "John Appleseed",
      id: -1,
      img: "http://placekitten.com/20/20",
      link: "#",
    },
  };

  return (
    <Container className="userpage">
      <Row className="max-window">
        <Col>
          <div className="welcome heading">
            <img src={user.img} alt="user-avatar" className="avatar--lg"></img>
            Welcome, {user.name}
          </div>
          <div className="block">
            <div className="heading">
              My Micropubs{" "}
              <Button className="btn--blue btn--lg">
                <BsFillPlusSquareFill />
                Create a Micropub
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
              <Button className="btn--blue btn--lg">
                <MdQuestionAnswer />
                Ask a Question
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
              <Button className="btn--white btn--lg">
                <MdQuestionAnswer />
                Browse Open Questions
              </Button>
            </div>
            <ListGroup className="list-group--large">
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                id={exampleQuestion.id}
                ansNum={0}
              />
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                id={exampleQuestion.id}
                ansNum={0}
              />
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                id={exampleQuestion.id}
                ansNum={0}
              />
              <Question
                asker={exampleQuestion.asker}
                title={exampleQuestion.title}
                id={exampleQuestion.id}
                ansNum={0}
              />
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
