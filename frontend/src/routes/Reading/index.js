import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { MdQuestionAnswer, MdRateReview } from "react-icons/md";
import { BsCloudDownload, BsStar } from "react-icons/bs";

export default function index() {
  const example = {
    img: "https://dummyimage.com/520x200/000/F5F5F5.png",
    title: "Which vaccine, according to research is the safest?",
    text:
      "Cheese and biscuits cauliflower cheese cream cheese. Monterey jack fromage frais stilton everyone loves edam jarlsberg monterey jack st. agur blue cheese. Cheesy grin swiss cheesecake say cheese cheese triangles paneer smelly cheese stinking bishop. Blue castello halloumi emmental...",
    id: -1,
    authors: [
      {
        name: "John Appleseed",
        id: -1,
        img: "http://placekitten.com/20/20",
        link: "#",
      },
    ],
    publishTime: "July 49, 2031",
    data: [{ name: "2021-06-18 data.png", link: "#" }],
    reviewNum: 0,
  };
  return (
    <Container className="reading">
      <div className="body">
        <div className="heading">{example.title}</div>
        <img src={example.img} alt="figure"></img>
        <div className="text">{example.text}</div>
      </div>
      <div className="sidebar">
        <div className="info">
          <div className="publish-time">
            <div className="label">Published:</div>
            <div className="time">{example.publishTime}</div>
          </div>
          <div className="authors">
            <div className="label">Author(s):</div>
            <div className="list">
              {example.authors
                ? example.authors.map((author) => (
                    <a href={author.link} key={author.id}>
                      <img src={author.img} className="avatar--sm" />
                      {author.name}
                    </a>
                  ))
                : ""}
            </div>
          </div>
          <div className="data">
            <div className="label">Data and Resources:</div>
            <div className="list">
              {example.data
                ? example.data.map((file) => (
                    <a href={file.link} key={file.id}>
                      {file.name}
                      <BsCloudDownload className="sidebar__icon" />
                    </a>
                  ))
                : ""}
            </div>
          </div>
          <div className="reviews">
            <div className="label">Reviews:</div>
            <div className="stars">
              <BsStar /> <BsStar /> <BsStar /> <BsStar /> <BsStar />(
              {example.reviewNum})
            </div>
          </div>
          <Button className="btn--white">View Related Questions</Button>
        </div>
        <Button className="btn--blue btn--large">
          <MdQuestionAnswer />
          Ask a Question
        </Button>
        <Button className="btn--blue btn--large">
          <MdRateReview />
          Write a Review
        </Button>
      </div>
    </Container>
  );
}
