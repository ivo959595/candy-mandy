import React from "react";

function ScoreBoard({ score }) {
  return (
    <div className="scoreBoard">
      <h1 className="heading"> Score {score} </h1>

    </div>
  );
}

export default ScoreBoard;
