window.addEventListener("DOMContentLoaded", () => {
  reset();
  _Setup();
});

let _GAMESTATE = null;
let humanColor = null;
let computerColor = null;
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let chances = 0;
let human = "P";
let computer = "C";
let movesAllowed = false;

function _Setup() {
  checkMovesAllowed();
  const white = document.getElementById("white");
  const black = document.getElementById("black");

  white.addEventListener("click", function () {
    humanColor = "white";
    computerColor = "black";
    console.log(humanColor);
    _Initialize();
  });
  black.addEventListener("click", function () {
    humanColor = "black";
    computerColor = "white";
    console.log(humanColor);
    _Initialize();
  });
}

function _Initialize() {
  movesAllowed = true;
  const options = document.getElementsByClassName("options");
  options[0].style.visibility = "hidden";
  const table = document.getElementsByTagName("table");
  table[0].style.visibility = "visible";
  const block = document.getElementsByTagName("td");
  if (movesAllowed) {
    for (let i = 0; i < 9; i++) {
      block[i].addEventListener("click", () => {
        move(block[i], human, humanColor);
      });
    }
  }
}
function checkMovesAllowed() {
  if (!movesAllowed) {
    console.log("not allowed");
    const block = document.getElementsByTagName("td");
    for (let i = 0; i < 9; i++) {
      block[i].removeEventListener("click", () => {
        move(block[i], human, humanColor);
      });
    }
  }
}
function move(ele, player, color) {
  if (board[ele.id] != "P" && board[ele.id] != "C") {
    ++chances;
    ele.style.backgroundColor = color;
    board[ele.id] = player;
    console.log(board, player);
    if (checkWinning(player)) {
      movesAllowed = false;
      checkMovesAllowed();
      console.log("WINNER");
      setTimeout(() => reset(), 500);
    } else if (chances > 8) {
      console.log("TIE");
      setTimeout(() => reset(), 500);
    } else {
      round++;
    }
  }
}
function reset() {
  humanColor = null;
  computerColor = null;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  chances = 0;
  human = "P";
  computer = "C";
  const options = document.getElementsByClassName("options");
  options[0].style.visibility = "visible";
  const table = document.getElementsByTagName("table");
  table[0].style.visibility = "hidden";
  const block = document.getElementsByTagName("td");
  for (let i = 0; i < 9; i++) {
    block[i].style.backgroundColor = "transparent";
  }

  _Setup();
}
function checkWinning(player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
