import React from "react";
import { Tabs, Tab } from "react-bootstrap";

export default function MicropubBody(props) {
  return (
    <div className="micropub-body">
      <div className="heading">{props.title}</div>
      <Tabs defaultActiveKey="body">
        <Tab eventKey="body" title="Body">
          <img src={props.img} alt="figure"></img>
          <div className="text">{props.body}</div>
        </Tab>
        <Tab eventKey="reference" title="Reference">
          <div></div>
        </Tab>
      </Tabs>
    </div>
  );
}
