import React, { useState } from "react";
import UploadImage from "./UploadImage";
import axios from "axios";
import ResultsContainer from "./ResultsContainer";
import HeatmapImage from "./HeatmapImage";
import Loader from "./Loader";
import ReturnButton from "./ReturnButton";

export default function ModelView({ onModelNotFoundError }) {
  const [results, setResults] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeImage = async (image) => {
    let formData = new FormData();
    formData.append("file", image);
    try {
      setResults(null);
      setHeatmap(null);
      setIsLoading(true);
      let rsp = await axios.post(
        process.env.REACT_APP_API_URL + "upload-image",
        formData,
        {
          withCredentials: true,
        }
      );
      if (rsp.status == 404) {
        onModelNotFoundError();
        return;
      }
      let data = rsp.data;
      setIsLoading(false);
      setResults(data.prediction);
      setHeatmap(data.heatmap);
    } catch (err) {
      setIsLoading(false);
      if (!err.response) {
        console.log(err);
        return;
      }
      if (err.response.status == 404) {
        onModelNotFoundError();
      }
    }
  };
  return (
    <div className="content-box">
      <UploadImage onChangeImage={handleChangeImage} />
      <HeatmapImage heatmapStr={heatmap} />
      <ResultsContainer results={results} />
      <Loader isLoading={isLoading} />
    </div>
  );
}
