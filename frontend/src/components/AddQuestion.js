import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import VisibilitySelector from "./VisibilitySelector";
import {createAPI, getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import {getRefreshToken} from "../lib/helpers";
import slugify from "slugify";

export default function AddQuestion(props) {
  const { user } = useAuthContext();
  const location = useLocation();
  const [micopubs, setMicropubs] = useState([]);
  if (props.micropub) {
    setMicropubs([props.micropub]);
  }
  const [visibility, setVisibility] = useState(null);
  const [description, setDescription] = useState(null);
  const [question, setQuestion] = useState(null);
  const history = useHistory();

  const handleSelect = (e) => setVisibility(e);
  const handleDescriptionChange = (e) => {
    stopEventPropagationTry(e);
    setDescription(e.target.value);
  };
  const handleQuestionChange = (e) => {
    stopEventPropagationTry(e);
    setQuestion(e.target.value);
  };

  const stopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
      try {
        event.stopPropagation();
      } catch (e) {
        console.log(e);
      }

    }
  };
  const handleAddQuestion = async (e) => {
    const submitQ = {
      "question": question,
      "description": description,
      "slug" : slugify(question),
    };
    return createAPI("/questions",submitQ ).then((response)=>{
      console.log(response.data);
     // history.push("/user");
      let slug = response.data.attributes.slug;
      let redir = `/question/${slug}`;
      //Redirect(redir);
      history.push(redir);
    }).catch((err) => {
     console.error(err);

       if (user) {
         getRefreshToken();
       } else {
         // display some dialog login
          Redirect("/signin");
       }


    });
  };
  if (user) {

  return (
    <Form className="popup">
      <Form.Group className="inputs">
        <div className="heading">Add a Question </div>
        <Form.Control type="text" placeholder="Question"
                      className="subject"
                      value={question}
                      onChange={handleQuestionChange}
        />
        <Form.Control
          as="textarea"
          placeholder="Brief Details"
          className="description"
          onChange={handleDescriptionChange}
        />
        <div className="search">
          Keywords: <input type="text" placeholder="Search"></input>
        </div>
        <div className="search">
          Make this question:
          <VisibilitySelector
            visibility={visibility}
            handleSelect={handleSelect}
          />
        </div>
        <div className="search">
          Tag Researchers: <input type="text" placeholder="Search"></input>
        </div>
        <div className="search">
          Tag a Micropub:  <input type="text" placeholder="Search">
          {/*{*/}
          {/*micopubs.length > 0 ? <div> micopubs[0]</div>: ""}*/}
        </input>


        </div>
      </Form.Group>
      <Form.Group className="controls">
        <Button className="btn--lg btn--cancel" onClick={props.close}>
          Cancel
        </Button>
        <Button className="btn--lg" onClick={(e) => handleAddQuestion(e)}>
          <MdQuestionAnswer />
          Ask a Question
        </Button>
      </Form.Group>
    </Form>
  );
  } else {
    return   <Redirect
        to={{
          pathname: "/signin",
          state: { from: location }
        }}
    />
  }

}
