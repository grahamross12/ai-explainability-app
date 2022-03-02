export default function HeatmapImage({ heatmapStr }) {
  if (!heatmapStr) return null;
  return (
    <div className="heatmap-image-container">
      <img
        className="heatmap-image"
        src={"data:image/jpeg;base64," + heatmapStr}
      ></img>
    </div>
  );
}
