import React from "react";

const Error = ({ onRetry }) => (
  <div className="error">
    <h1>Ops!</h1>
    <p>An error occurred when loading the notes list.</p>
    <button className="error__button" onClick={onRetry}>
      Try again
    </button>
  </div>
);

export default Error;
