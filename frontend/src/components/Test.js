import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomButton = () => <span className="octicon octicon-star" />;

function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
    <button className="ql-link"></button>
  </div>
);

/*
 * Editor component with custom toolbar and content containers
 */
export default function Editor() {
  const [state, setState] = useState({ editorHtml: "" });
  useEffect(() => {
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].setAttribute("target", "_self");
    }
  }, []);
  function handleChange(html) {
    setState({ editorHtml: html });
  }

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill onChange={handleChange} modules={Editor.modules} />
    </div>
  );
}
