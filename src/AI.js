// ai.js

// Hàm tính toán nước đi tốt nhất cho AI sử dụng thuật toán Minimax
export function bestMove(squares, isXNext) {
    const player = isXNext ? "X" : "O";
    const opponent = isXNext ? "O" : "X";
  
    const winner = checkWinner(squares);
    if (winner === player) return { score: 1 };
    if (winner === opponent) return { score: -1 };
    if (squares.every(Boolean)) return { score: 0 };
  
    let bestMoveIndex = {
      index: null,
      score: isXNext ? -Infinity : Infinity
    };
  
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = player; 
        const move = bestMove(squares, !isXNext); 
        squares[i] = null; 
  
        move.index = i;
        if (isXNext) {
          if (move.score > bestMoveIndex.score) bestMoveIndex = move;
        } else {
          if (move.score < bestMoveIndex.score) bestMoveIndex = move;
        }
      }
    }
    return bestMoveIndex;
  }
  
  // Hàm để kiểm tra người thắng
  export function checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }