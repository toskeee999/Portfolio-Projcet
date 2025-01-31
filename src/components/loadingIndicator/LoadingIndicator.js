import "./LoadingIndicator.css";

function LoadingIndicator() {
  return (
    <div className="ring">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export default LoadingIndicator;
