import React from "react";

export default function UploadImage({ onChangeImage }) {
  return (
    <>
      <label htmlFor="file-upload" className="image-upload-box button-large">
        UPLOAD IMAGE
      </label>
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          onChangeImage(e.target.files[0]);
        }}
      />
    </>
  );
}
