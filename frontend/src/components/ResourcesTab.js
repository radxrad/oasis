import React from "react";
import Dropzone from "react-dropzone";
import { AiFillPicture } from "react-icons/ai";

function ResourcesTab() {
  return (
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
}

export default ResourcesTab;
