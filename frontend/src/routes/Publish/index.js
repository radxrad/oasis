import React, { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  ListGroup,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { BiGlobe } from "react-icons/bi";
import MicropubCard from "components/MicropubCard";
import text from "text.json";
import MicropubBody from "components/MicropubBody";
import history from "history.js";
import Dropzone from "react-dropzone";
import { AiFillPicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Publish() {
  const [value, setValue] = useState("");

  const exampleCard = text.micropubCard;
  const exampleBody = text.micropub;

  const abstract = (
    <div className="abstract">
      <input
        type="textarea"
        placeholder="What question would you like to answer?..."
      />
      <ReactQuill value={value} onChange={setValue} />
    </div>
  );

  const resources = (
    <div>
      <Dropzone
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
        maxSize={10000000}
        multiple
        accept=".jpg, .png, .pdf, .csv, .tsv, .xlsx"
      >
        {({ getRootProps, getInputProps }) => (
          <section className="dropzone">
            <input {...getInputProps()} />
            <div {...getRootProps()}>
              <AiFillPicture />
              <p className="label">Drag Resources Here</p>
              <p className="upload">Or select from your computer...</p>
              <div className="req">
                <p>.jpg .png .pdf .csv .tsv .xlsx</p>
                <p>max file size: 10MB</p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
  const body = <ReactQuill value={value} onChange={setValue} />;

  const preview = (
    <div className="preview">
      <div className="label">Card Preview</div>
      <MicropubCard
        img={exampleCard.img}
        authors={exampleCard.authors}
        title={exampleCard.title}
        text={exampleCard.text}
        id={exampleCard.id}
      ></MicropubCard>
      <div className="label">Micropub Preview</div>
      <MicropubBody
        title={exampleBody.title}
        img={exampleBody.img}
        text={exampleBody.text}
      />
    </div>
  );

  return (
    <div id="publish">
      <Tab.Container defaultActiveKey="#abstract">
        <Row className="max-window">
          <Col className="tab__nav">
            <h2 className="heading">Create a Micropub</h2>
            <ListGroup defaultActiveKey="#abstract">
              <ListGroup.Item action href="#abstract">
                Abstract
              </ListGroup.Item>
              <ListGroup.Item action href="#resources">
                Data and Resources
              </ListGroup.Item>
              <ListGroup.Item action href="#body">
                Body
              </ListGroup.Item>
              <ListGroup.Item action href="#preview">
                Preview
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col className="tab__content">
            <Tab.Content>
              <Tab.Pane eventKey="#abstract">{abstract}</Tab.Pane>
              <Tab.Pane eventKey="#resources">{resources}</Tab.Pane>
              <Tab.Pane eventKey="#body">{body}</Tab.Pane>
              <Tab.Pane eventKey="#preview">{preview}</Tab.Pane>
            </Tab.Content>
          </Col>
          <Col className="sidebar">
            <div className="list">
              <div className="label">Authors</div>
              <div className="search">
                Add Author: <input type="text" placeholder="Search"></input>
              </div>
            </div>
            <div>
              <div className="label">Visibility</div>
              <DropdownButton
                title={
                  <div>
                    <BiGlobe />
                    Public
                  </div>
                }
                id="bg-vertical-dropdown-2"
              >
                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
              </DropdownButton>
            </div>
            <div>
              <div className="label">Keywords</div>
              <div className="search">
                Add Keyword: <input type="text" placeholder="Search"></input>
              </div>
            </div>
            <div>
              <div className="label">Uploaded Resources</div>
              <Table></Table>
            </div>
            <div style={{ flex: 1, background: "none" }}></div>
            <div className="controls">
              <Button className="btn--sm btn--lightblue" variant="primary">
                Save
              </Button>
              <Button className="btn--sm btn--blue" variant="primary">
                Publish
              </Button>
              <Button
                className="btn--sm btn--discard"
                variant="danger"
                onClick={() => history.push("/user")}
              >
                Discard
              </Button>
            </div>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
