import React, { useState } from "react";
import { Button, ListGroup, Tab, Table } from "react-bootstrap";
import text from "text.json";
import history from "history.js";
import MicropubCard from "../components/MicropubCard";
import MicropubBody from "../components/MicropubBody";
import VisibilitySelector from "../components/VisibilitySelector";
import ResourcesTab from "../components/ResourcesTab";
import TextEditor from "../components/TextEditor";

export default function Publish() {
  const [abstractValue, setAbstractValue] = useState(null);
  const [refList, setRefList] = useState([]);
  const [bodyValue, setBodyValue] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [activeTab, setActiveTab] = useState("#abstract");

  const handleSelect = (e) => setVisibility(e);
  const handleAbstractChange = (e) => setAbstractValue(e);
  const handleBodyChange = (e) => setBodyValue(e);

  const micropub = text.micropub;

  const tabNav = (
    <div className="tab__nav">
      <h2 className="heading">Create a Micropub</h2>
      <ListGroup defaultActiveKey={activeTab} onSelect={(e) => setActiveTab(e)}>
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
        <ListGroup.Item action href="#body" active={"#body" === activeTab}>
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
  );

  const tabContent = (
    <div className="tab__content">
      <Tab.Content defaultActiveKey={activeTab}>
        <Tab.Pane eventKey="#abstract" active={"#abstract" === activeTab}>
          <div className="abstract">
            <input
              type="textarea"
              placeholder="What question would you like to answer?..."
            />
            <TextEditor
              parent="abstract"
              value={abstractValue}
              onChange={handleAbstractChange}
              refList={refList}
              setRefList={setRefList}
            />
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey="#resources" active={"#resources" === activeTab}>
          <ResourcesTab />
        </Tab.Pane>
        <Tab.Pane eventKey="#body" active={"#body" === activeTab}>
          <div className="body-tab">
            <div className="label">Body</div>
            <TextEditor
              parent="body"
              value={bodyValue}
              onChange={handleBodyChange}
              refList={refList}
              setRefList={setRefList}
            />
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey="#preview" active={"#preview" === activeTab}>
          <div className="preview">
            <div className="label">Card Preview</div>
            <MicropubCard
              img={micropub.img}
              authorIds={micropub.authorIds}
              title={micropub.title}
              abstract={micropub.abstract}
            ></MicropubCard>
            <div className="label">Micropub Preview</div>
            <MicropubBody
              title={micropub.title}
              figure={micropub.img}
              body={micropub.body}
              refList={micropub.refList}
            />
          </div>
        </Tab.Pane>
      </Tab.Content>
    </div>
  );

  const sidebar = (
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
  );

  return (
    <div id="publish">
      <Tab.Container defaultActiveKey={activeTab}>
        <div className="max-window">
          {tabNav}
          {tabContent}

          {sidebar}
        </div>
      </Tab.Container>
    </div>
  );
}
