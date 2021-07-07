import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function MicroPub(props) {
  return (
    <Card className="micropub">
      <Row>
        <Card.Img src={props.img} />
        <Col>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Col>
      </Row>
      <div className="authors">
        {props.authors
          ? props.authors.map((author) => (
              <Card.Link href={author.link} key={author.id}>
                <img src={author.img} className="avatar--sm" />
                {author.name}
              </Card.Link>
            ))
          : ""}
      </div>
    </Card>
  );
}
