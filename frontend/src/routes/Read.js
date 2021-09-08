import React, { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { MdQuestionAnswer, MdRateReview } from "react-icons/md";
import { BsCloudDownload, BsStar, BsStarFill } from "react-icons/bs";
import MicropubBody from "components/MicropubBody";
import text from "text.json";
import AddQuestion from "components/AddQuestion";
import { FaArrowUp } from "react-icons/fa";
import { IoFlag, IoFlagOutline } from "react-icons/io5";
import moment from "moment";

export default function Read() {
  const example = text.micropub;
  const time = moment.unix(example.publishTime).format("MM/DD/YYYY");
  const [upvoteNum, setUpvoteNum] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpvote = () => {
    if (isUpvoted) setUpvoteNum(upvoteNum - 1);
    else {
      setUpvoteNum(upvoteNum + 1);
    }
    setIsUpvoted(!isUpvoted);
  };
  const handleFlag = () => setIsFlagged(!isFlagged);
  const handleStar = () => setIsStarred(!isStarred);
  return (
    <Container id="read">
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
            <div className="time">{time}</div>
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
          <div className="controls">
            <Button className={"upvote--" + isUpvoted} onClick={handleUpvote}>
              <FaArrowUp />
              {upvoteNum}
            </Button>
            <Button className="icon-btn" id="flag-btn" onClick={handleFlag}>
              {isFlagged ? <IoFlag /> : <IoFlagOutline />}
            </Button>
            <Button className="icon-btn" id="star-btn" onClick={handleStar}>
              {isStarred ? <BsStarFill /> : <BsStar />}
            </Button>
          </div>
          <Button className="btn--white">View Related Questions</Button>
        </div>
        <div className="controls">
          <Button className="btn--blue btn--lg" onClick={handleShow}>
            <MdQuestionAnswer />
            Ask a Question
          </Button>
          <Button className="btn--blue btn--lg">
            <MdRateReview />
            Write a Review
          </Button>
        </div>
      </div>
    </Container>
  );
}
