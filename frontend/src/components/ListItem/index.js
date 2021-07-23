import React from "react";
import { BsBook, BsQuestionCircle, BsCardText } from "react-icons/bs";

export default function index(props) {
  const iconMapping = {
    micropub: <BsBook />,
    question: <BsQuestionCircle />,
    answer: <BsCardText />,
  };
  const type = props.type;
  const title = props.title;

  return (
    <a className={`listitem__${type} listitem`} href="/reading">
      {iconMapping[type]} {title}
    </a>
  );
}
