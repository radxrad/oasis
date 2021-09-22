import React, { useState } from "react";
import { Button, ListGroup, Tab, Table } from "react-bootstrap";
import MicropubCard from "components/MicropubCard";
import text from "text.json";
import MicropubBody from "components/MicropubBody";
import history from "history.js";
import Dropzone from "react-dropzone";
import { AiFillPicture } from "react-icons/ai";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cite from "citation-js";
import VisibilitySelector from "../components/VisibilitySelector";

export default function Publish() {
  const [abstractValue, setAbstractValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [refInput, setRefInput] = useState("");
  const [refList, setRefList] = useState([]);
  const [refError, setRefError] = useState("");
  const [visibility, setVisibility] = useState(null);

  const [activeTab, setActiveTab] = useState("#abstract");

  const handleSelect = (e) => setVisibility(e);

  async function addReference(input) {
    setRefError("");
    try {
      const data = await Cite.async(input);
      let output = data.format("bibliography", {
        format: "html",
        template: "harvard",
        lang: "en-US",
      });
      setRefList((refList) => [...refList, output]);
      console.log(refList);
    } catch (error) {
      setRefError(error.message);
    }
  }
  const handleRefInputChange = (event) => {
    setRefInput(event.target.value);
  };

  const example = text.micropub;

  const abstract = (
    <div className="abstract">
      <input
        type="textarea"
        placeholder="What question would you like to answer?..."
      />
      <ReactQuill value={abstractValue} onChange={setAbstractValue} />
    </div>
  );

  const resources = (
    <div className="resources">
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
  const body = (
    <div className="body-tab">
      <div className="label">Body</div>
      <ReactQuill value={bodyValue} onChange={setBodyValue} theme="snow" />
      <div className="label">References</div>
      <div className="reference">
        <input
          type="search"
          value={refInput}
          onChange={handleRefInputChange}
          placeholder="BibTeX, CFF, DOI, ISBN or Wikidata"
        ></input>
        <Button onClick={() => addReference(refInput)}>Add</Button>
        <div className="error-msg">{refError}</div>
        <ListGroup>
          {refList.map((item) => (
            <ListGroup.Item dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ListGroup>
      </div>
    </div>
  );

  const preview = (
    <div className="preview">
      <div className="label">Card Preview</div>
      <MicropubCard
        img={example.img}
        authorIds={example.authorIds}
        title={example.title}
        abstract={example.abstract}
      ></MicropubCard>
      <div className="label">Micropub Preview</div>
      <MicropubBody
        title={example.title}
        img={example.img}
        body={example.body}
      />
    </div>
  );

  return (
    <div id="publish">
      <Tab.Container defaultActiveKey={activeTab}>
        <div className="max-window">
          <div className="tab__nav">
            <h2 className="heading">Create a Micropub</h2>
            <ListGroup
              defaultActiveKey={activeTab}
              onSelect={(e) => setActiveTab(e)}
            >
              <ListGroup.Item
                action
                href="#abstract"
                active={"#abstract" === activeTab}
              >
                Abstract
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#resources"
                active={"#resources" === activeTab}
              >
                <span>Data and </span>Resources
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#body"
                active={"#body" === activeTab}
              >
                Body
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#preview"
                active={"#preview" === activeTab}
              >
                Preview
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="tab__content">
            <Tab.Content defaultActiveKey={activeTab}>
              <Tab.Pane eventKey="#abstract" active={"#abstract" === activeTab}>
                {abstract}
              </Tab.Pane>
              <Tab.Pane
                eventKey="#resources"
                active={"#resources" === activeTab}
              >
                {resources}
              </Tab.Pane>
              <Tab.Pane eventKey="#body" active={"#body" === activeTab}>
                {body}
              </Tab.Pane>
              <Tab.Pane eventKey="#preview" active={"#preview" === activeTab}>
                {preview}
              </Tab.Pane>
            </Tab.Content>
          </div>
          <div className="sidebar">
            <div className="list">
              <div className="label">Authors</div>
              <div className="search">
                Add Author: <input type="text" placeholder="Search"></input>
              </div>
            </div>
            <div>
              <div className="label">Visibility</div>
              <VisibilitySelector
                visibility={visibility}
                handleSelect={handleSelect}
              />
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
          </div>
        </div>
      </Tab.Container>
    </div>
  );
}
