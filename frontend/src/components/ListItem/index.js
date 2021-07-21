import React from "react";
import { BsBook, BsQuestionCircle, BsCardText } from "react-icons/bs";
import { Container } from "react-bootstrap";
import { classNames } from "classnames";

export default function index(props) {
  const iconMapping = {
    micropub: <BsBook />,
    question: <BsQuestionCircle />,
    answer: <BsCardText />,
  };
  const type = props.type;
  const title = props.title;

  return (
    <Container className={`listitem__${type} listitem`}>
      {iconMapping[type]} {title}
    </Container>
  );
}
