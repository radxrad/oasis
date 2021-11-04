import { FaRegStar, FaStar } from "react-icons/fa";
import React from "react";
import { Button } from "react-bootstrap";

function StarRating(props) {
  const rating = props.rating;
  const setHover = props.setHover;
  const setRating = props.setRating;
  const hover = props.hover;

  const stars = [];
  const getIcon = (i) => {
    if (hover >= i) return <FaStar fill="#0559FD" />;
    else if (!hover && rating >= i) return <FaStar fill="#0559FD" />;
    return <FaRegStar />;
  };
  if (!props.readonly) {
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Button
          className="icon-btn"
          key={i}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
        >
          {getIcon(i)}
        </Button>
      );
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Button className="icon-btn" key={i}>
          {getIcon(i)}
        </Button>
      );
    }
  }
  return <div className="stars">{stars}</div>;
}

export default StarRating;
