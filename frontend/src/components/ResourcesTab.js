import React, { useState, useEffect } from "react";
import { AiFillPicture, AiOutlineCheckCircle } from "react-icons/ai";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Table } from "react-bootstrap";

function ResourcesTab(props) {
  const [files, setFiles] = useState([]);
  const customInput = () => (
    <div className="input-wrapper">
      <AiFillPicture />
      <p className="label">Drag Resources Here</p>
      <p className="upload">Or select from your computer...</p>
      <div className="req">
        <p>.jpg .png .pdf .csv .tsv .xlsx</p>
        <p>max file size: 10MB</p>
      </div>
    </div>
  );

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

  return (
    <div className="resources">
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        inputContent={customInput}
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
                <th>
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
