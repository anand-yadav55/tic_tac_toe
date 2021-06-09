let i, j;
let player = {
  active: true,
};
let board = [];
let gameEnd = false;

// starter
function Setup() {
  // creating board
  const app = document.getElementById("app");
  let k = 0;
  for (i = 0; i < 3; i++) {
    let row = document.createElement("div");
    for (j = 0; j < 3; j++) {
      let box = document.createElement("div");
      box.setAttribute("class", "box");
      box.setAttribute("id", k++);
      box.addEventListener("click", move);
      row.appendChild(box);
    }
    app.appendChild(row);
  }

  //assign each box as blank
  for (i = 0; i < 9; i++) {
    board[i] = "B";
  }
}
//Display Board
function displayBoard() {
  let box = document.getElementsByClassName("box");
  for (i = 0; i < 9; i++) {
    if (board[i] != "B") {
      box[i].classList.add("filled");
      if (board[i] == "C") {
        box[i].classList.add("C");
      }
      if (board[i] == "P1") {
        box[i].classList.add("P1");
      }
    }
  }
}
// check moves allowed
function move(e) {
  if (!gameEnd) {
    if (player.active) {
      if (e.target.id >= 0 && e.target.id < 9 && positionAvailable(e)) {
        board[e.target.id] = "P1";
        // console.log("moved");
        player.active = false;
        displayBoard();
      }
    }
    // window.setTimeout(() => {
    if (!player.active) {
      aiMove();
      player.active = true;
      displayBoard();
    }
    // }, 500);
    // console.log(board);
    checkWinner();
  }
  if (gameEnd) {
    let resetButton = document.createElement("button");
    resetButton.setAttribute("class", "reset");
    resetButton.textContent = "RESET";
    document.getElementById("app").appendChild(resetButton);
  }
}
function positionAvailable(e) {
  return !e.target.classList.contains("filled");
}

function aiMove() {
  let availableMoves = availableMovesForP2();
  if (availableMoves.length == 0) {
    // console.log("no moves");
    return;
  }
  let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  // console.log("available" + availableMoves + " computer:" + move);
  board[move] = "C";
}

function availableMovesForP2() {
  let arr = [];
  for (i = 0; i < 9; i++) {
    if (board[i] == "B") {
      arr.push(i);
    }
  }
  return arr;
}
// remove click event listener
function removeBoxClickEvent() {
  let box = document.getElementsByClassName("box");
  for (i = 0; i < box.length; i++) {
    box[i].removeEventListener("click", move);
  }
}
// winning conditions
function checkWinner() {
  const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //All equal check

  for (let i of conditions) {
    let countP = 0,
      countC = 0;
    // console.log("i: " + i);
    for (let j of i) {
      // console.log("j: " + j);
      if (board[j] == "P1") countP++;
      else if (board[j] == "C") countC++;
      // console.log("countP: ", countP, "countC: ", countC);
    }
    if (countP == 3) {
      console.log("P1 won");
      document.getElementsByClassName("msg")[0].innerHTML = "You WON";
      gameEnd = true;
      removeBoxClickEvent();
      return;
    } else if (countC == 3) {
      console.log("C won");
      document.getElementsByClassName("msg")[0].innerHTML = "Computer WON";
      gameEnd = true;
      removeBoxClickEvent();
      return;
    }
  }
  let tmp = 0;
  for (i = 0; i < board.length; i++) {
    if (board[i] != "B") {
      tmp++;
    }
  }
  if (tmp == 9) {
    gameEnd = true;
    document.getElementsByClassName("msg")[0].innerHTML = "TIE";
    removeBoxClickEvent();
    return;
  }
}

Setup();
