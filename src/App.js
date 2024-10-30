import React, { useState, useEffect } from 'react';
import { checkWinner, bestMove } from './AI';
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });
  useEffect(() => {
    if (!isXNext && !checkWinner(squares) && squares.some(sq => !sq)) {
      const aiMove = bestMove(squares, false); 
      console.log(aiMove);
      if (aiMove.index !== null) {
        const newSquares = squares.slice();
        newSquares[aiMove.index] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }
    }
  }, [squares, isXNext]);

  function handleClick(index) {
    if (squares[index] || checkWinner(squares) || !isXNext) return;
    const newSquares = squares.slice();
    newSquares[index] = 'X';
    setSquares(newSquares);
    setIsXNext(false);
  }

  const winner = checkWinner(squares);
  let status;
  if (winner) {
    status = `Người chiến thắng là: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "Hoà!";
  } else {
    status = `Người tiếp theo: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="scoreboard">
        <div>Người chơi thắng: {score.X}</div>
        <div>Máy thắng: {score.O}</div>
        <div>Draws: {score.draw}</div>
      </div>

      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <button key={index} className={(square == 'X')?"square red":"square blue"} onClick={() => handleClick(index)}>
            {square}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={() => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
      }}>
        Chơi lại
      </button>
    </div>
  );
}

export default App;