import "./Loader.css";

export default function Loader({ isLoading }) {
  //if (!isLoading) return null;
  let display;
  if (isLoading) display = "block";
  else display = "none";
  return (
    <div className="loader-heatmap">
      <div className="lds-ring" style={{ display: display }}>
        <div></div>
      </div>
    </div>
  );
}
