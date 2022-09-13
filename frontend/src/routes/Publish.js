import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { Button, ListGroup, Tab, Table, Dropdown } from "react-bootstrap";
//import text from "text.json";
import history from "history.js";
import MicropubCard from "../components/MicropubCard";
import MicropubBody from "../components/MicropubBody";
import { EditorState,convertToRaw } from "draft-js";
// import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import VisibilitySelector from "../components/VisibilitySelector";
import ResourcesTab from "../components/ResourcesTab";
import TextEditor from "../components/TextEditor";
import {fetchAPI, getStrapiURL, createAPI, updateAPI} from "../lib/api";
import slugify from "slugify";

export default function Publish() {
  let navigate = useHistory();
  // Convert these values to html: draftToHtml(convertToRaw(abstractValue.getCurrentContent()));
  const [editingValue, setEditingValue] = useState(false); // set to true after save or edit
  const [strapiDocId, setStrapiDocId] = useState()
  const [abstractValue, setAbstractValue] = useState(EditorState.createEmpty());
  const [bodyValue, setBodyValue] = useState(EditorState.createEmpty());
  const [titleValue, setTitleValue] = useState("");
  const [refList, setRefList] = useState([]);
  const [writerValue, setWriterVal]= useState([]);
  const [filesValue, setFilesValue]= useState();
  const [imageValue, setImageValue]= useState();
  const [visibility, setVisibility] = useState("");
  const [errors, setErrors]= useState("");
  const [showError, setShowError] = useState(false);
  const [activeTab, setActiveTab] = useState("#abstract");

  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);

  const handleSelect = (e) => setVisibility(e);
  const handleAbstractChange = (e) => setAbstractValue(e);
  const handleBodyChange = (e) => setBodyValue(e);
  const handleTitleChange=  (event) =>{
    setTitleValue( event.target.value);
  }
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

  const handleSave = (e) => {
    var form = e.target
    // const hasErrors = !form.email?.length || !validator.isEmail(form.email ?? '')
    const hasErrors = false
    setErrors(hasErrors)
    let title =titleValue

    const abstractHtml =draftToHtml(convertToRaw(abstractValue.getCurrentContent()))
    const bodyHtml = draftToHtml(convertToRaw(bodyValue.getCurrentContent()))
    // let raw = `<div class="radquestion" >
    //                <div class='abstract'> ${abstractHtml} </div>
    //                 <div class="body">${bodyHtml} </div>
    //                 <div class="referenceList">${refList}</div>
    //                 <div class="resources">${resources}</div>
    //              </div>
    //   `
  //  let tags = keywordsArray
    //let title =convertToRaw(abstractValue.getCurrentContent())

    // let raw =convertToRaw(bodyValue.getCurrentContent())
    // "tags[]" is repeated in the formbody in discourse.. so will need to do something.
   // let body = JSON.stringify({"title":title, "raw":raw, "tags[]":keywordsArray[0]});
    let slug = slugify(titleValue)
    const mpObj = {
      "title": titleValue,
      "abstract": abstractHtml,
      "body": bodyHtml,
      "keywords": keywords,
      "refList": refList,
      "slug":slug

    };
    if(!errors) {
      ///setFetching(true)
      createAPI('/micropublications', mpObj)
          // THIS IS HANDLE CREATE
          .then(data => {
            if(data.data.attributes.slug) {
              //navigate('/message?d=postcreated')
              setEditingValue(true)
              setStrapiDocId(data.data.id)
              setErrors("Saved")
              handleErrorShow()


            } else {
              // navigate('/message?d=postfail')
              setErrors(errors)
              handleErrorShow()
            }
          }).catch(err => {
        console.log(err)
        handleErrorShow()
      })
    }
  }
  const handlePublish = (e) => {

    var form = e.target
    // const hasErrors = !form.email?.length || !validator.isEmail(form.email ?? '')
    const hasErrors = false
    setErrors(hasErrors)
    let title =titleValue

    const abstractHtml =draftToHtml(convertToRaw(abstractValue.getCurrentContent()))
    const bodyHtml = draftToHtml(convertToRaw(bodyValue.getCurrentContent()))
    // let raw = `<div class="radquestion" >
    //                <div class='abstract'> ${abstractHtml} </div>
    //                 <div class="body">${bodyHtml} </div>
    //                 <div class="referenceList">${refList}</div>
    //                 <div class="resources">${resources}</div>
    //              </div>
    //   `
    // let tags = keywordsArray
    //let title =convertToRaw(abstractValue.getCurrentContent())

    // let raw =convertToRaw(bodyValue.getCurrentContent())
    // "tags[]" is repeated in the formbody in discourse.. so will need to do something.
    // let body = JSON.stringify({"title":title, "raw":raw, "tags[]":keywordsArray[0]})
    let slug = slugify(titleValue)
    const mpObj = {
      "title": titleValue,
      "abstract": abstractHtml,
      "body": bodyHtml,
      "keywords": keywords,
      "refList": refList,
      "slug":slug,
      "writer": 1 // for now

    };
    if(!errors) {
      ///setFetching(true)
      if (editingValue ){
        updateAPI('/micropublications', slug,  mpObj)
            // THIS IS HANDLE CREATE
            .then(data => {

              if(data.data.attributes.slug) {
                //navigate('/message?d=postcreated')
                navigate.push({
                  pathname: `/Read/${data.data.attributes.slug}`,

                })


              } else {
                // navigate('/message?d=postfail')
                handleErrorShow()
              }
            }).catch(err => {
          console.log(err)
          handleErrorShow()
        })
      } else {
        createAPI('/micropublications', mpObj)
            // THIS IS HANDLE CREATE
            .then(data => {

              if(data.data.attributes.slug) {
                //navigate('/message?d=postcreated')
                navigate.push({
                  pathname: `/Read/${data.data.attributes.slug}`,

                })


              } else {
                // navigate('/message?d=postfail')
                handleErrorShow()
              }
            }).catch(err => {
          console.log(err)
          handleErrorShow()
        })
      }

    }
  }
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
                value={titleValue}
                onChange={handleTitleChange}
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
              img={imageValue}
              authorIds={writerValue}
              title={titleValue}
              abstract={draftToHtml(convertToRaw(abstractValue.getCurrentContent()))}
            ></MicropubCard>
            <div className="label">Micropub Preview</div>
            <MicropubBody
              title={titleValue}
              figure={imageValue}
              body={draftToHtml(convertToRaw(bodyValue.getCurrentContent()))}
              refList={refList}
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
        <Button className="btn--sm btn--blue" variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button className="btn--sm btn--blue" variant="primary" onClick={handlePublish}>
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
