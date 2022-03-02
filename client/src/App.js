import "./App.css";
import React, { useState } from "react";
import UploadModel from "./components/UploadModel";
import axios from "axios";
import ModelView from "./components/ModelView";

function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const handleUploadModel = async (model) => {
    let formData = new FormData();
    formData.append("file", model);
    try {
      await axios.post(
        process.env.REACT_APP_API_URL + "upload-model",
        formData,
        { withCredentials: true }
      );
      setIsModelLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModelNotFoundError = () => {
    console.log("model not loaded");
    setIsModelLoaded(false);
  };

  return (
    <div className="App">
      {isModelLoaded ? (
        <ModelView onModelNotFoundError={handleModelNotFoundError} />
      ) : (
        <UploadModel onUploadModel={handleUploadModel} />
      )}
    </div>
  );
}

export default App;
