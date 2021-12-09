import React, { useState, useEffect } from "react";
import { AiFillPicture, AiOutlineCheckCircle } from "react-icons/ai";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Table } from "react-bootstrap";

function ResourcesTab(props) {
  //Initial Get request here and then set the files state
  const [files, setFiles] = useState([]);

  //Change url here to the api path
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };
  const handleSubmit = (newFiles, allFiles) => {
    setFiles([...files, ...newFiles.map((f) => f.meta)]);
    allFiles.forEach((f) => f.remove());
  };

  console.log(files);
  return (
    <div className="resources">
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
      />

      <div className="file-list">
        <Table responsive>
          <thead>
            <tr>
              <th>File name</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {files.map((item, index) => (
              <tr key={index}>
                <th>{item.name}</th>
                <th>{item.size} kb</th>
                <th style={{ textAlign: "center" }}>
                  {item.status === "removed" ? (
                    <AiOutlineCheckCircle />
                  ) : (
                    item.status
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ResourcesTab;
