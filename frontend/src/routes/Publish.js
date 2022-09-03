import React, {useEffect, useState} from "react";
import { Button, ListGroup, Tab, Table } from "react-bootstrap";
//import text from "text.json";
import history from "history.js";
import MicropubCard from "../components/MicropubCard";
import MicropubBody from "../components/MicropubBody";
import { EditorState } from "draft-js";
// import { convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import VisibilitySelector from "../components/VisibilitySelector";
import ResourcesTab from "../components/ResourcesTab";
import TextEditor from "../components/TextEditor";
import {fetchAPI} from "../lib/api";

export default function Publish() {
  // Convert these values to html: draftToHtml(convertToRaw(abstractValue.getCurrentContent()));
  const [abstractValue, setAbstractValue] = useState(EditorState.createEmpty());
  const [bodyValue, setBodyValue] = useState(EditorState.createEmpty());

  const [refList, setRefList] = useState([]);
  const [visibility, setVisibility] = useState("");
  const [activeTab, setActiveTab] = useState("#abstract");

  const handleSelect = (e) => setVisibility(e);
  const handleAbstractChange = (e) => setAbstractValue(e);
  const handleBodyChange = (e) => setBodyValue(e);

  //const micropub = text.micropub;
  const [micropub, setMicropub] = useState([]);
  const [categories, setCategories ]= useState([]);
  const [keywords, setKeywords ]= useState([]);
  // const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("user"));
  const [isSignedIn,setIsSignedIn] = useState(localStorage.getItem("user"));
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect( () =>  {
    // const options = {
    //   method: "GET",
    //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/fetch/micropubs/2",
    //   headers: { "Content-Type": "application/json", Prefer: "" },
    // };
    //
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     setMicropubs(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    const fetchData = async () => {
      const [ categoriesRes, keywordRes, homepageRes] = await Promise.all([
        fetchAPI("/categories", { populate: "*" }),
        fetchAPI("/keywords", { populate: "*" }),
        fetchAPI("/homepage", {
          populate: {
            hero: "*",
            seo: { populate: "*" },
          },
        }),
      ]);
      const cats = await categoriesRes;
      const kws  = await keywordRes;
      setCategories(cats.data);
      setKeywords(kws.data);
    }

    fetchData()
        // make sure to catch any error
        .catch(console.error);
  }, []);

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
              img={micropub.attributes.img}
              authorIds={micropub.attributes.authorIds}
              title={micropub.attributes.title}
              abstract={micropub.attributes.abstract}
            ></MicropubCard>
            <div className="label">Micropub Preview</div>
            <MicropubBody
              title={micropub.attributes.title}
              figure={micropub.attributes.img}
              body={micropub.attributes.body}
              refList={micropub.attributes.refList}
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
