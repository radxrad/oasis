import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import Cite from "citation-js";
import "react-quill/dist/quill.snow.css";
import { BiBookAdd } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { ListGroup, Button, Form } from "react-bootstrap";
import MyLink from "./CustomTheme";
import CustomTheme from "./CustomTheme";

const SnowTooltip = Quill.import("themes/snow");
class CustomTooltip extends SnowTooltip {}
CustomTooltip.TEMPLATE = [
  '<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>',
  '<h1>"hi"</h1>',
  '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
  '<a class="ql-action"></a>',
  '<a class="ql-remove"></a>',
].join("");
Quill.register(CustomTheme, true);
Quill.register(MyLink, true);

export default function TextEditor(props) {
  const [citationInput, setCitationInput] = useState("");
  const [citationError, setCitationError] = useState("");
  const reactQuillRef = useRef(null);
  const {
    editorState,
    onChange,
    parent,
    citationList,
    setCitationList,
  } = props;
  const id = "toolbar-" + parent;

  useEffect(() => {
    const targets = document.querySelectorAll(".abstract .ql-preview");
    if (targets && targets.length > 0) {
      const link = targets[0];
      if (link.href) {
        console.log(link.href.startsWith("#"));
        link.removeAttribute("rel");
        link.setAttribute("target", "_self");
      }
      console.log(link);
    }
  });

  const handleCitationInputChange = (e) => setCitationInput(e.target.value);

  const toggleShow = () => {
    let popup = document.getElementById("citation-popup-" + parent);
    popup.classList.toggle("hidden");
  };

  const showPopUp = () => {
    let popup = document.getElementById("citation-popup-" + parent);
    popup.classList.remove("hidden");
  };

  function addCitation() {
    const quillRef = reactQuillRef.current.getEditor();
    const index = citationList.length + 1;
    const length = quillRef.getLength();
    let delta;
    if (length === 1)
      delta = {
        ops: [
          {
            insert: `[${index}]`,
            attributes: { link: `#citation-item-${index}` },
          },
        ],
      };
    else {
      delta = {
        ops: [
          { retain: length - 1 },
          {
            insert: `[${index}]`,
            attributes: { link: `#citation-item-${index}` },
          },
        ],
      };
    }
    quillRef.updateContents(delta);
  }

  const getCitation = async () => {
    const input = citationInput;
    setCitationError("");
    if (!input || !input.trim()) {
      setCitationError("Invalid input");
      return;
    }
    try {
      const data = await Cite.async(input);
      let output = data.format("bibliography", {
        format: "html",
        template: "harvard",
        lang: "en-US",
      });
      setCitationList([...citationList, output]);
    } catch (error) {
      setCitationError(error.message);
      console.log(error);
      return;
    }
    addCitation();
    toggleShow();
  };

  console.log(Quill.imports);
  const deleteCitation = (index) => {
    setCitationList(citationList.filter((_, i) => i !== index));
  };

  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        addCitation: showPopUp,
      },
    },
  };

  const customPopup = (
    <div className="hidden" id={"citation-popup-" + parent}>
      <Form>
        <Form.Group controlId="formBasic">
          <Form.Label>RBibTeX, CFF, DOI, ISBN or Wikidata</Form.Label>
          <Form.Control
            type="text"
            value={citationInput}
            onChange={handleCitationInputChange}
          />
          <Form.Control.Feedback>{citationError}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Button onClick={getCitation}>Add</Button>
          <Button onClick={toggleShow}>Cancel</Button>
        </Form.Group>
      </Form>
    </div>
  );

  const customToolbar = (
    <div id={id}>
      <span className="ql-formats">
        <select
          className="ql-header"
          defaultValue={""}
          onChange={(e) => e.persist()}
        >
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option value=""></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-code-block"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-align" value=""></button>
        <button className="ql-align" value="center"></button>
        <button className="ql-align" value="right"></button>
        <button className="ql-align" value="justify"></button>
      </span>

      <span className="ql-formats">
        <button className="ql-link"></button>
        <button className="ql-image"></button>
        <button className="ql-video"></button>
        <button className="ql-formula"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-clean"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-addCitation">
          <div className="addCitation__wrapper">
            <BiBookAdd />
            Add Reference
          </div>
        </button>
      </span>
    </div>
  );

  useEffect(() => {});

  return (
    <div className="text-editor-wrapper">
      <div className="text-editor">
        {customToolbar}
        <ReactQuill
          modules={modules}
          ref={reactQuillRef}
          defaultValue={editorState.editorHtml}
          onChange={onChange}
          // theme="customTheme"
          placeholder="Enter here"
        >
          <div className="ql-editing-area">{customPopup}</div>
        </ReactQuill>
        {customPopup}
      </div>
      <ListGroup className="citation-list">
        {citationList && citationList.length > 0 ? (
          <h6 className="heading">References</h6>
        ) : (
          ""
        )}
        {citationList
          ? citationList.map((item, i) => (
              <ListGroup.Item id={"citation-item-" + (i + 1)} key={i}>
                <span dangerouslySetInnerHTML={{ __html: item }} />
                <Button
                  className="icon-btn delete-citation-btn"
                  onClick={() => deleteCitation(i)}
                >
                  <FiDelete />
                </Button>
              </ListGroup.Item>
            ))
          : ""}
      </ListGroup>
    </div>
  );
}
