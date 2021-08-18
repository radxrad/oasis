import React from "react";

export default function MicropubBody(props) {
  return (
    <div className="body">
      <div className="heading">{props.title}</div>
      <img src={props.img} alt="figure"></img>
      <div className="text">{props.body}</div>
    </div>
  );
}
