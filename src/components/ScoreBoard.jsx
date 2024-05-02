import React from "react";

function ScoreBoard({ score }) {
  return (
    <div className="scoreBoard">

      <h1 className="heading">Candy-Mandy</h1>

      <h2 className="score"> Score : {score} </h2>

    </div>
  );
}

export default ScoreBoard;
