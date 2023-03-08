import React from "react";
import { BsBook, BsQuestionCircle, BsCardText } from "react-icons/bs";

export default function QuestionFrontPage(props) {
  const iconMapping = {
    micropub: <BsBook />,
    question: <BsQuestionCircle />,
    answer: <BsCardText />,
  };
  const type = props.type;
  const title = props.title;
  const slug = props.slug;
  const num = props.ansNum;
  return (
      <div >
       <div className={`listitem__${type} listitem`}>
         <a href={`/question/${slug}`}>
           {iconMapping[type]} {title}

         </a>
       </div>
        <div >
          {num > 1 ? `${num} answers` : `${num} answer`}
        </div>
      </div>

  );
}
