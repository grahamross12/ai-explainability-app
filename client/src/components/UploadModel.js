import React from "react";

export default function UploadModel({ onUploadModel }) {
  return (
    <div className="content-box">
      <label htmlFor="file-upload" className="image-upload-box button-large">
        UPLOAD MODEL
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".zip"
        style={{ display: "none" }}
        onChange={(e) => {
          onUploadModel(e.target.files[0]);
        }}
      />
    </div>
  );
}
