import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { EditorState, Modifier, ContentState } from "draft-js";
import { ListGroup, Button } from "react-bootstrap";
import htmlToDraft from "html-to-draftjs";
import Cite from "citation-js";
import { FiDelete } from "react-icons/fi";

export function AddReference(props) {
  const [refInput, setRefInput] = useState("");
  const [refError, setRefError] = useState("");
  const { parent, addRef, editorState, setEditorState, refIndex } = props;

  const toggleShow = () => {
    let popup = document.getElementById("ref-popup-" + parent);
    popup.classList.toggle("hidden");
  };

  function addRefMark(index) {
    if (!editorState) {
      console.log("no mark");
      return;
    }
    const blocksFromHtml = `<a href="#ref-item-${index}">[${index}]</a>`;
    let { contentBlocks, entityMap } = htmlToDraft(blocksFromHtml);

    let contentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      ContentState.createFromBlockArray(contentBlocks, entityMap).getBlockMap()
    );

    setEditorState(
      EditorState.push(editorState, contentState, "insert-fragment")
    );
  }

  async function addReference(input) {
    setRefError("");
    if (!input || !input.trim()) {
      setRefError("Invalid input");
      return;
    }
    try {
      const data = await Cite.async(input);
      let output = data.format("bibliography", {
        format: "html",
        template: "harvard",
        lang: "en-US",
      });
      addRef(output);
    } catch (error) {
      setRefError(error.message);
      return;
    }
    addRefMark(refIndex);
    toggleShow();
  }

  return (
    <div className="addref__wrapper">
      <button
        className="rdw-option-wrapper addref__button"
        onClick={toggleShow}
      >
        <AiFillFileAdd />
        Add Reference
      </button>
      <div className="rdw-embedded-modal hidden" id={"ref-popup-" + parent}>
        <div className="rdw-embedded-modal-header">
          <span className="rdw-embedded-modal-header-option">
            BibTeX, CFF, DOI, ISBN or Wikidata
          </span>
        </div>
        <div className="rdw-embedded-modal-link-section">
          <span className="rdw-embedded-modal-link-input-wrapper">
            <input
              className="rdw-embedded-modal-link-input"
              placeholder="Enter code"
              name="embeddedLink"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
            />
            <span className="rdw-image-mandatory-sign">*</span>
          </span>
          <div className="error-msg">{refError}</div>
        </div>
        <span className="rdw-embedded-modal-btn-section">
          <button
            type="button"
            className="rdw-embedded-modal-btn"
            onClick={() => addReference(refInput)}
          >
            Add
          </button>
          <button
            type="button"
            className="rdw-embedded-modal-btn"
            onClick={toggleShow}
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}

export default function TextEditor(props) {
  const [editorState, setEditorState] = useState(null);
  const { value, onChange, parent, refList, setRefList } = props;
  const addRef = (item) => setRefList((refList) => [...refList, item]);
  const deleteRef = (index) => {
    setRefList(refList.filter((_, i) => i !== index));
  };

  return (
    <div className="tab-wrapper">
      <Editor
        contentState={value}
        editorState={editorState}
        toolbarClassName="rdw__toolbar"
        wrapperClassName="rdw__wrapper"
        editorClassName="rdw__editor"
        onEditorStateChange={(e) => setEditorState(e)}
        onContentStateChange={onChange}
        toolbarCustomButtons={[
          <AddReference
            addRef={addRef}
            editorState={editorState}
            setEditorState={setEditorState}
            parent={parent + "-editor"}
            refIndex={refList.length + 1}
          />,
        ]}
        toolbar={{
          options: [
            "blockType",
            "textAlign",
            "inline",
            "list",
            "colorPicker",
            "link",
            "embedded",
            "image",
            "remove",
          ],
          inline: {
            inDropdown: false,
            options: [
              "bold",
              "italic",
              "underline",
              "superscript",
              "subscript",
            ],
          },
          textAlign: {
            inDropdown: true,
            options: ["left", "center", "right", "justify"],
          },
        }}
      />

      <ListGroup className="ref-list">
        {refList && refList.length > 0 ? (
          <h6 className="heading">References</h6>
        ) : (
          ""
        )}
        {refList
          ? refList.map((item, i) => (
              <ListGroup.Item id={"ref-item-" + (i + 1)} key={i}>
                <span dangerouslySetInnerHTML={{ __html: item }} />
                <Button
                  className="icon-btn delete-ref-btn"
                  onClick={() => deleteRef(i)}
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
