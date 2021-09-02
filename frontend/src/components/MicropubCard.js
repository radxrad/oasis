import React from "react";
import { Card } from "react-bootstrap";

export default function MicropubCard(props) {
  return (
    <Card className="micropub">
      <div className="content">
        <Card.Img src={props.figure} alt="img" />
        <div>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.abstract}</Card.Text>
        </div>
      </div>
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
