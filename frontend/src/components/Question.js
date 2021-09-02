import React from "react";
import { Button } from "react-bootstrap";

export default function Question(props) {
  const num = props.ansNum;
 // const asker = props.askerId;
  return (
    <div id={props.id} className="question">
      <div className="body">
        <p>{props.title}</p>
        <div className="control">
          {num > 1 ? `${num} answers` : `${num} answer`}
          <Button className="btn--white btn--lg">
            Answer <span>Question</span>
          </Button>
        </div>
      </div>
      <div className="arrow-down"></div>
      {/*
      <a href={asker.link} key={asker.id} className="asker">
        <img src={asker.img} className="avatar--sm" alt="avatar" />
        {asker.name}
      </a> */}
    </div>
  );
}
