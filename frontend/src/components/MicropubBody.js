import React from "react";
import { ListGroup } from "react-bootstrap";

export default function MicropubBody(props) {
  const { title, figure, body, refList } = props;
  return (
    <div className="micropub-body">
      <div className="heading">{title}</div>
      <div className="content">
        <img src={figure} alt="figure"></img>
        <div className="text">{body}</div>
        <ListGroup className="ref-list">
          {refList && refList.length > 0 ? (
            <h6 className="heading">References</h6>
          ) : (
            ""
          )}
          {refList
            ? refList.map((item, i) => (
                <ListGroup.Item id={"ref-item-" + (i + 1)} key={i}>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </ListGroup.Item>
              ))
            : ""}
        </ListGroup>
      </div>
    </div>
  );
}
