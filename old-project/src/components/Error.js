import React from "react";

const Error = ({ onRetry }) => (
  <div className="error">
    <h1>Ops!</h1>
    <p>An unexpected error occurred while loading the note list</p>
    <button className="error__button" onClick={onRetry}>
      Try again
    </button>
  </div>
);

export default Error;
