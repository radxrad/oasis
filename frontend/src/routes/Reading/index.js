import React, { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { MdQuestionAnswer, MdRateReview } from "react-icons/md";
import { BsCloudDownload, BsStar } from "react-icons/bs";
import MicropubBody from "components/MicropubBody";
import text from "text.json";
import AddQuestion from "components/AddQuestion";

export default function Reading() {
  const example = text.micropub;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="reading">
      <Modal show={show} onHide={handleClose}>
        <AddQuestion close={handleClose} />
      </Modal>
      <MicropubBody
        title={example.title}
        img={example.img}
        body={example.body}
      />
      <div className="sidebar">
        <div className="info">
          <div className="publish-time">
            <div className="label">Published:</div>
            <div className="time">{example.publishTime}</div>
          </div>
          <div className="authors">
            <div className="label">Author(s):</div>
            <div className="list">
              {example.authorIds
                ? example.authorIds.map((author) => (
                    <a href={author.link} key={author.id}>
                      <img
                        src={author.img}
                        className="avatar--sm"
                        alt="avatar"
                      />
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
        <Button className="btn--blue btn--lg" onClick={handleShow}>
          <MdQuestionAnswer />
          Ask a Question
        </Button>
        <Button className="btn--blue btn--lg">
          <MdRateReview />
          Write a Review
        </Button>
      </div>
    </Container>
  );
}
