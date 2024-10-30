export function bestMove(squares, isXNext) {
  const player = isXNext ? "X" : "O";
  const opponent = isXNext ? "O" : "X";
  const blockingMove = canBlockWinningMove(squares, opponent);
  const winningMove = canWinMove(squares, player);
    if (winningMove !== null) {
        return { score: 1,index: winningMove }; // Thực hiện nước đi thắng
    }
  if (blockingMove !== null) {
      return { score: 1,index: blockingMove };
  }
  const { score, index } = minimax(squares, player, opponent, isXNext);
  return { score, index };
}
function canWinMove(squares, player) {
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

  for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] === player && squares[b] === player && !squares[c]) {
          return c;
      }
      if (squares[a] === player && squares[c] === player && !squares[b]) {
          return b; 
      }
      if (squares[b] === player && squares[c] === player && !squares[a]) {
          return a; 
      }
  }
  return null;
}
function canBlockWinningMove(squares, opponent) {
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

  for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] === opponent && squares[b] === opponent && !squares[c]) {
          return c;
      }
      if (squares[a] === opponent && squares[c] === opponent && !squares[b]) {
          return b;
      }
      if (squares[b] === opponent && squares[c] === opponent && !squares[a]) {
          return a;
      }
  }
  return null;
}
function minimax(squares, player, opponent, isMaximizing, depth = 0) {
  const winner = checkWinner(squares);
  if (winner === player) return { score: 10 - depth };
  if (winner === opponent) return { score: depth - 10 };
  if (squares.every(Boolean)) return { score: 0 };
  if (depth >= 5) return { score: 0 };
  let bestMoveIndex = {
      score: isMaximizing ? -Infinity : Infinity,
      index: null,
  };

  for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
          squares[i] = isMaximizing ? player : opponent; // Đặt quân cờ
          const move = minimax(squares, player, opponent, !isMaximizing); // Đệ quy với lượt của đối thủ
          squares[i] = null; // Hoàn tác nước đi

          move.index = i;
          if (isMaximizing) {
              if (move.score > bestMoveIndex.score) bestMoveIndex = move;
          } else {
              if (move.score < bestMoveIndex.score) bestMoveIndex = move;
          }
      }
  }
  return bestMoveIndex;
}
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