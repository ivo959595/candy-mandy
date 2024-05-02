import React from "react";

function ScoreBoard({ score }) {
  return (
    <div className="scoreBoard">

      <h2 className="score"> Candy-Mandy Score : {score} </h2>

    </div>
  );
}

export default ScoreBoard;
