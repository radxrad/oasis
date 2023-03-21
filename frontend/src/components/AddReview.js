import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import VisibilitySelector from "./VisibilitySelector";
import {createAPI, getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";

export default function AddReview(props) {
  const { setUser } = useAuthContext();
  const [micopub, setMicropub] = useState();
  if (props.micropub) {
    setMicropub(props.micropub);
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
      "micropublication": micopub
    };
    return createAPI("/questions",submitQ ).then((response)=>{
      console.log(response.data);
      history.push("/user");
      props.close()
    }).catch((err) => {
     console.error(err);
     if (err.status == 401 ){

     }
    });
  };

  return (
    <Form className="popup">
      <Form.Group className="inputs">
        <div className="heading">Add a Review </div>
        <Form.Control type="text" placeholder="Review"
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
          Add a Review
        </Button>
      </Form.Group>
    </Form>
  );
}
