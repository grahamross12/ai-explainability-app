export default function ResultsContainer({ results }) {
  const renderResults = (resultsList) => {
    let results = [];
    resultsList.forEach((label, idx) => {
      let percentage = label[1].toFixed(5) * 100;
      results.push(
        <div key={idx}>
          {label[0]}: {percentage}%
        </div>
      );
    });
    return results;
  };

  if (!results) return null;
  return (
    <div className="results-container">{renderResults(results.Labels)}</div>
  );
}
