import React, { useState } from "react";
import { DropdownButton, Dropdown, Form, Button } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { BiGlobe } from "react-icons/bi";
export default function WriteReview(props) {
  const [starNum, setStarNum] = useState(0);
  const [hoverNum, setHoverNum] = useState(0);

  const getIcon = (i) => {
    if (hoverNum >= i) return <FaStar fill="#0559FD" />;
    else if (!hoverNum && starNum >= i) return <FaStar fill="#0559FD" />;
    return <FaRegStar />;
  };
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Button
        className="icon-btn"
        key={i}
        onClick={() => setStarNum(i)}
        onMouseEnter={() => setHoverNum(i)}
        onMouseLeave={() => setHoverNum(0)}
      >
        {getIcon(i)}
      </Button>
    );
  }
  return (
    <Form className="popup write-review">
      <Form.Group className="inputs">
        <div className="header">
          <div className="heading">Write a Review </div>
          <div className="stars">
            {stars}
            {"(" + starNum + ")"}
          </div>
        </div>

        <Form.Control type="text" placeholder="Topic" className="subject" />
        <Form.Control
          as="textarea"
          placeholder="Review..."
          className="review"
        />
        <div className="search">
          Make this question:
          <DropdownButton
            title={
              <div>
                <BiGlobe />
                Public
              </div>
            }
          >
            <Dropdown.Item eventKey="1">Anonymous</Dropdown.Item>
          </DropdownButton>
        </div>
      </Form.Group>
      <Form.Group className="controls">
        <Button className="btn--lg btn--cancel" onClick={props.close}>
          Cancel
        </Button>
        <Button className="btn--lg">
          <MdRateReview />
          Post Review
        </Button>
      </Form.Group>
    </Form>
  );
}
