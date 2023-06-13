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
import { draftToMarkdown } from 'markdown-draft-js';
import VisibilitySelector from "../components/VisibilitySelector";
import ResourcesTab from "../components/ResourcesTab";
import TextEditor from "../components/TextEditor";
import {fetchAPI, getStrapiURL, createAPI, updateAPI, getStrapiAuth} from "../lib/api";
import slugify from "slugify";
import {forEach} from "react-bootstrap/ElementChildren";
//import Micropub from "../context/Micropub";
import { getToken } from "../lib/helpers";
import {useAuthContext} from "../context/AuthContext";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

export default function Publish(props) {


  const { user, isLoading, setUser } = useAuthContext();
  let endpoint = '/micropublications';
  let navigate = useHistory();
  //const micropubContext = useContext(Micropub);
  // Convert these values to html: draftToHtml(convertToRaw(abstractValue.getCurrentContent()));
  const [editingValue, setEditingValue] = useState(false); // set to true after save or edit
  const [strapiDocId, setStrapiDocId] = useState()
  const [abstractValue, setAbstractValue] = useState(EditorState.createEmpty());
  const [bodyValue, setBodyValue] = useState(EditorState.createEmpty());
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [refList, setRefList] = useState([]);
  const [writerValue, setWriterVal]= useState([]);
  const [filesValue, setFilesValue]= useState();
  const [imageValue, setImageValue]= useState();
  const [visibility, setVisibility] = useState("");
  const [errors, setErrors]= useState("");
  const [showError, setShowError] = useState(false);
  const [activeTab, setActiveTab] = useState("#abstract");
  const [authors,setAuthors] = useState([]);
  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);
  const stopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
      try {
        event.stopPropagation();
      } catch (e) {
        console.log(e);
      }

    }
  };
  const handleSelect = (e) =>{
    stopEventPropagationTry(e);
    setVisibility(e);
  }
  const handleAbstractChange = (e) => {
    stopEventPropagationTry(e);
    setAbstractValue(e);
  }
  const handleBodyChange = (e) => {
    stopEventPropagationTry(e);
    setBodyValue(e);
  }
  const handleTitleChange=  (event) =>{
    stopEventPropagationTry(event);
    setTitleValue( event.target.value);
  };
  const filterBy = () => true;
  const handleKeywordSearch = (query) => {
    setIsSearchLoading(true);
    fetchAPI("/keywords", {
      filters:
          { name:{'$startsWith':
              query
            }
          }

    }).then((items ) => {
      let kwlist = items.data.map(i =>  ( {"id":i.id, "slug": i.attributes.slug, "name": i.attributes.name}) );
      setKeywords(kwlist);
      setIsSearchLoading(false);
    });

    // fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
    //     .then((resp) => resp.json())
    //     .then(({ items }) => {
    //         setOptions(items);
    //         setIsLoading(false);
    //     });
  };
  const handleAddKeywords = (e) => {
    console.log("test" + e.target.value);
  } ;
  //const micropub = text.micropub;
  const [micropub, setMicropub] = useState([]);
  const [resources,SetResources] = useState([]);
  const [categories, setCategories ]= useState([]);
  const [keywords, setKeywords ]= useState([]);
  const [options, setOptions] = useState([]);
  const [questions, setQuestions]= useState([]);
  // const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("user"));
  const [isSignedIn,setIsSignedIn] = useState(localStorage.getItem("user"));
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect( () =>  {
    const question = props.history.location.state?.question;
    const questionid = props.history.location.state?.questionid;
    if (question !=="" || question === undefined )(
        setTitleValue(question)
    );

    //let params = questionid? {filter:questionid}
    // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering
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
      const [ categoriesRes, keywordRes, homepageRes, questionRes] = await Promise.all([
        fetchAPI("/categories", {}),
        fetchAPI("/keywords", {   }),
        fetchAPI("/homepage", {
          populate: {
            hero: "*",
            seo: { populate: "*" },
          },
        }),
          fetchAPI("/questions", {}),

      ]);
      const cats = await categoriesRes;
      const kws  = await keywordRes;
      const aq = await questionRes;



      setCategories(cats.data);
      setKeywords(kws.data);
      setQuestions(aq.data);


    }

    fetchData()
        // make sure to catch any error
        .catch(console.error);
  }, []);

  useEffect( () =>  {
    const question = props.history.location.state?.question;
    const questionid = props.history.location.state?.questionid;
    if (question !=="" || question === undefined )(
        setTitleValue(question)
    );

    //let params = questionid? {filter:questionid}
    // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering
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
      const [ userRes] = await Promise.all([
        fetchAPI("/users", { filters: {
            username: user.username,
          },}),
      ]);

      const users = await userRes;
      if (users.length >0) {
        const user_id = await users[0].id ;
      }
      setAuthors([user]);
    }

    fetchData()
        // make sure to catch any error
        .catch(console.error);
  }, [user]);

  const fileRefs = (fileList) => {
    let data = new FormData()

    return ["25"]
  }
  const handleFileUpload = async (allFiles, pubId) => {
    //console.log(files.map(f => f.meta));
    // allFiles.forEach(f => f.remove());
  if (allFiles === undefined) return;

    var formData = new FormData();
    formData.append('ref', 'api::micropublication.micropublication');
    formData.append('field', 'files');
    formData.append('refId',pubId);
    allFiles.forEach(fileWithMeta => {
      formData.append('files', fileWithMeta.file);
    });

    await fetch(getStrapiURL('/api/upload'), {
      method: 'POST',
      headers: {
        //'Content-type': 'application/json; charset=UTF-8'
        "Authorization": getStrapiAuth()
      },
      // body: JSON.stringify(form)
      body: formData
    })
        .then(response => response.json())
        .then(data => {
          resources.push(data)
          //setResources(resources)
          // if(data.success) {
          //     navigate('/message?d=postcreated')
          // } else {
          //     navigate('/message?d=postfail')
          // }
        });

  };
  function fileUploadList(){
    const list = resources.map( r => {
      return r.id;
    });
    return list;
  };
  function buildMicropub(){
    let mp = micropub;
    let slug = slugify(titleValue);
    if (mp.slug) {
      slug = mp.slug;
    }
    let title =titleValue;

    const abstractHtml =draftToHtml(convertToRaw(abstractValue.getCurrentContent()));
    const bodyHtml = draftToHtml(convertToRaw(bodyValue.getCurrentContent()));

    //let mpFiles = fileRefs(filesValue);
   // let mpFiles =fileUploadList();
    const mpObj = {
      "title": titleValue,
      "abstract": abstractHtml,
      "body": bodyHtml,
     // "keywords": keywords,
      "refList": refList,
      "slug":slug,
     // "files": mpFiles,
      "writer": 1 // for now

    };
    return mpObj;
  }
 function createMp(mpObj){
   createAPI(endpoint, mpObj)
       // THIS IS HANDLE CREATE
       .then(data => {
         setMicropub(data.data);
         if(data.data.attributes.slug) {
           //navigate('/message?d=postcreated')
           setEditingValue(true);
           setStrapiDocId(data.data.id);
           setErrors("Saved");
           if (filesValue !== undefined){
             handleFileUpload(filesValue,strapiDocId);
           };

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
 function updateMp(mpObj, slug ){
   updateAPI(endpoint, strapiDocId,  mpObj)
       // THIS IS HANDLE CREATE
       .then(data => {
          setMicropub(data.data);
           if (filesValue !== undefined){
             handleFileUpload(filesValue,strapiDocId);
           };
           // navigate.push({
           //   pathname: `/Read/${data.data.attributes.slug}`,
           //
           // });



       }).catch(err => {
     console.log(err);
     handleErrorShow();
   })
 }
  const handleSave = (e) => {
    stopEventPropagationTry(e);
    var form = e.target;
    // const hasErrors = !form.email?.length || !validator.isEmail(form.email ?? '')
    const hasErrors = false;
    setErrors(hasErrors);


    let mpObj = buildMicropub();
    let slug = mpObj.slug;
    if(!errors) {
      ///setFetching(true)
      // createAPI('/micropublications', mpObj)
      //     // THIS IS HANDLE CREATE
      //     .then(data => {
      //       if(data.data.attributes.slug) {
      //         //navigate('/message?d=postcreated')
      //         setEditingValue(true)
      //         setStrapiDocId(data.data.id)
      //         setErrors("Saved")
      //         handleFileUpload(filesValue,strapiDocId)
      //         handleErrorShow()
      //
      //
      //       } else {
      //         // navigate('/message?d=postfail')
      //         setErrors(errors)
      //         handleErrorShow()
      //       }
      //     }).catch(err => {
      //   console.log(err)
      //   handleErrorShow()
      // })
      if(!errors) {
        ///setFetching(true)
        if (editingValue ){
          updateMp(mpObj, slug);
        } else  {
        createMp(mpObj);
        }
      }
    }
  }

  const handlePublish = (e) => {
    stopEventPropagationTry(e);
    var form = e.target
    // const hasErrors = !form.email?.length || !validator.isEmail(form.email ?? '')
    const hasErrors = false
    setErrors(hasErrors)

    let mpObj = buildMicropub();
    let slug = mpObj.slug;
    if(!errors) {
      ///setFetching(true)
      if (editingValue ){
        updateMp(mpObj, slug);
      } else  {
        createMp(mpObj);
      }
      navigate.push({
        pathname: `/Read/${slug}`,

      });


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
      <Tab.Content >
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

          <ResourcesTab props={{filesValue,setFilesValue}} delayUpdate='true'/>
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
        { authors ? authors.map((a, i) => (
            <div>{a.name}</div>
        ) ) : "" }
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
          Add Keyword:
          <AsyncTypeahead
              onBlur={handleAddKeywords}
              filterBy={filterBy}
              id="async-example"
              isLoading={isLoading}
              labelKey="name"
              minLength={3}
              onSearch={handleKeywordSearch}
              options={keywords}
              placeholder="Select Keywords..."
              renderMenuItemChildren={(option) => (
                  <>

                    <span>{option.name}</span>
                  </>
              )}
          />
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
