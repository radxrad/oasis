import React from "react";
import { DropdownButton, Dropdown, Form, Button } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import { BiGlobe } from "react-icons/bi";
export default function AddQuestion(props) {
  return (
    <Form className="popup">
      <Form.Group className="inputs">
        <div className="heading">Add a Question </div>
        <Form.Control type="text" placeholder="Question" className="subject" />
        <Form.Control
          as="textarea"
          placeholder="Descriptions"
          className="description"
        />
        <div className="search">
          Keywords: <input type="text" placeholder="Search"></input>
        </div>
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
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="search">
          Tag Researchers: <input type="text" placeholder="Search"></input>
        </div>
        <div className="search">
          Tag a Micropub: <input type="text" placeholder="Search"></input>
        </div>
      </Form.Group>
      <Form.Group className="controls">
        <Button className="btn--lg btn--cancel" onClick={props.close}>
          Cancel
        </Button>
        <Button className="btn--lg">
          <MdQuestionAnswer />
          Ask a Question
        </Button>
      </Form.Group>
    </Form>
  );
}
