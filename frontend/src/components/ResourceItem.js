import React from "react";
import { BsBook, BsQuestionCircle, BsCardText } from "react-icons/bs";

export default function ResourceItem(props) {
  const iconMapping = {
    image: <BsBook />,
    document: <BsQuestionCircle />,
    answer: <BsCardText />,
  };
  //const type = props.type;
  const name = props.original_filename;
  const url = propsResourcesTab.js.url;
  // {iconMapping[type]}className={`listitem__${type} listitem`}
  return (
    <tr  href={`url`} >

      {name}
    </tr>
  );
}
