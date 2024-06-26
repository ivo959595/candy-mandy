import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard.jsx";

import blueCandy from './img/blue-candy.png'
import greenCandy from './img/green-candy.png'
import orangeCandy from './img/orange-candy.png'
import purpleCandy from './img/purple-candy.png'
import redCandy from './img/red-candy.png'
import yellowCandy from './img/yellow-candy.png'
import blank from './img/blank.png'

import Reset from "./components/Reset.jsx";

const width = 8;
const candyColors = [blueCandy, greenCandy, orangeCandy , purpleCandy, redCandy, yellowCandy];

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank


      if (columnOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach((square) => (currentColorArrangement[square] = blank ))
          return true;
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {

        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach((square) => (currentColorArrangement[square] = blank));
          return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const roWOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue;

      if (
        roWOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)
      ) {
        setScoreDisplay((score) => score + 3)
        roWOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const roWOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue;

      if (
        roWOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)
      ) {
        setScoreDisplay((score) => score + 4)
        roWOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0,1,2,3,4,5,6,7]
      const isFirstRoww = firstRow.includes(i)

      if(isFirstRoww && currentColorArrangement[i] === blank){
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if (currentColorArrangement[i + width] ===  blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };


  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e) => {
  
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute("src")
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src")


    const validMoves= [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

      const isAColumnOfFour = checkForColumnOfFour()
      const isARowOfFour = checkForRowOfFour()
      const isARowOfThree = checkForRowOfThree()
      const isAColumnOfThree = checkForColumnOfThree()

      if(squareBeingReplacedId && 
        validMove && 
        (isARowOfThree || isAColumnOfThree || isAColumnOfFour || isARowOfFour)){
          setSquareBeingDragged(null)
          setSquareBeingReplaced(null)
      } else {
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute("src")
        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute("src")
        setCurrentColorArrangement([...currentColorArrangement])
      }
  }

const reset = () =>{
  createBoard()
  setScoreDisplay(0)

}

  const createBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div className="App">
    <div className="boreScoard">
      <ScoreBoard score={scoreDisplay}/>
      <Reset reset={reset}/>
    </div>

      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <div className="image-container">
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragEnter={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragLeave={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
          </div>
        ))}
      </div>

     
    </div>


  );
}

export default App;
