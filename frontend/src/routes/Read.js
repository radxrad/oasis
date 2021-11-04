import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { MdQuestionAnswer, MdRateReview } from "react-icons/md";
import { BsCloudDownload, BsStar, BsStarFill } from "react-icons/bs";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import MicropubBody from "components/MicropubBody";
import text from "text.json";
import AddQuestion from "components/AddQuestion";
import moment from "moment";
import a_question from "discourse_json/post_20.json";

import VisibilitySelector from "components/VisibilitySelector";
import StarRating from "../components/StarRating";

export default function Read() {
  const example = text.micropub;
  const post = a_question;
  const time = moment.unix(example.publishTime).format("MM/DD/YYYY");
  const [voteType, setVoteType] = useState(null);
  const [voteNum, setVoteNum] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewRatingHover, setReviewRatingHover] = useState(0);

  const [visibility, setVisibility] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  // const [reviews, setReviews] = useState([
  const [reviews] = useState([{ user: "Aa", text: "testing", rating: 3 }]);
  const handleStar = () => setIsStarred(!isStarred);
  const handleSelect = (e) => setVisibility(e);

  const handleVoteClick = (type) => {
    if (voteType === null) {
      setVoteNum(type === true ? voteNum + 1 : voteNum - 1);
      setVoteType(type);
    } else if (type === voteType) {
      setVoteType(null);
      setVoteNum(type === true ? voteNum - 1 : voteNum + 1);
    } else {
      setVoteType(type);
      setVoteNum(type === true ? voteNum + 2 : voteNum - 2);
    }
  };

  const writeReview = (
    <Form className="write-review">
      <Form.Group style={{ flex: "1 0" }}>
        <Form.Control
          as="textarea"
          placeholder="Write a review..."
          className="review"
        />
      </Form.Group>
      <Form.Group className="controls">
        <div className="selectors">
          <StarRating
            rating={reviewRating}
            setRating={setReviewRating}
            hover={reviewRatingHover}
            setHover={setReviewRatingHover}
            readonly={false}
          />
          <VisibilitySelector
            visibility={visibility}
            handleSelect={handleSelect}
          />
        </div>

        <Button className="btn--md">
          <MdRateReview />
          Post Review
        </Button>
      </Form.Group>
    </Form>
  );

  return (
    <div id="read" className="max-window">
      <Modal show={showQuestion} onHide={() => setShowQuestion(false)}>
        <AddQuestion close={() => setShowQuestion(false)} />
      </Modal>
      <div>
        <MicropubBody
          title={post.topic_slug}
          figure={post.avatar_template}
          body={post.raw}
          refList={post.refList}
        />
        {writeReview}
        <div className="review__wrapper">
          {reviews
            ? reviews.map((item, i) => (
                <div id={i} key={i} className="review__item">
                  <div className="header">
                    {item.user}{" "}
                    <StarRating readonly={true} rating={item.rating} />{" "}
                  </div>
                  {item.text}
                </div>
              ))
            : ""}
        </div>
      </div>

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
          <Button className="btn--white view-related-btn">
            View Related Questions
          </Button>
        </div>
        <div className="controls">
          <div className="icon-group">
            <div id="vote-btn" className={"vote--" + voteType}>
              <GoArrowUp
                id="upvote-btn"
                onClick={() => handleVoteClick(true)}
              />
              {voteNum}
              <GoArrowDown
                id="downvote-btn"
                onClick={() => handleVoteClick(false)}
              />
            </div>

            <Button className="icon-btn" id="star-btn" onClick={handleStar}>
              {isStarred ? (
                <BsStarFill className="star-btn--filled" />
              ) : (
                <BsStar />
              )}
            </Button>
          </div>
          <Button
            className="btn--blue btn--md"
            onClick={() => setShowQuestion(true)}
          >
            <MdQuestionAnswer />
            Ask a Question
          </Button>
          <Button
            className="btn--blue btn--md"
            onClick={() => console.log("aa")}
          >
            <MdRateReview />
            Write a Review
          </Button>
        </div>
      </div>
    </div>
  );
}
