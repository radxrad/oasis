import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function MicropubCard(props) {
  return (
    <Card className="micropub">
      <Row>
        <Card.Img src={props.figure} alt="img" />
        <Col>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.abstract}</Card.Text>
        </Col>
      </Row>
      <div className="authors">
        {/* {props.authors
          ? props.authors.map((author) => (
              <Card.Link href={author.link} key={author.id}>
                <img src={author.img} className="avatar--sm" alt="avatar" />
                {author.name}
              </Card.Link>
            ))
          : ""} */}
      </div>
    </Card>
  );
}
