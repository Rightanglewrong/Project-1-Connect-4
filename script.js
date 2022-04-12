// Constants
const statusEl = document.getElementById("Status");
const playEl = document.querySelector("#play");
const resetEl = document.querySelector("#reset");

const playerOneEl = document.querySelector("#player1");
const playerOneScore = document.querySelector("#p1");
const playerTwoEl = document.querySelector("#player2");
const playerTwoScore = document.querySelector("#p2");
const cellsEl = document.querySelectorAll(".box");

const players = [1, -1];
let turn = -1;
let turnCounter;
// REORGANIZE
const winningCombos = [
  // Rows
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
];

statusEl.textContent =
"Well, Baby-O, it's not exactly mai-thais and yatzee out here but... let's do it!";

//Event Listeners
playEl.addEventListener("click", playGame);
resetEl.addEventListener("click", resetGame);

//Game Init Fn
function playGame() {
  function turnState(i) {
    if (turn === 1) {
      cellsEl[i].classList.remove("empty");
      cellsEl[i].classList.add("taken");
      cellsEl[i].classList.add("red");
      cellsEl[i].innerHTML = 1;
      turnTracker();
    } else if (turn === -1) {
      cellsEl[i].classList.remove("empty");
      cellsEl[i].classList.add("taken");
      cellsEl[i].classList.add("green");
      cellsEl[i].innerHTML = -1;
      turnTracker();
    }
  }
  for (let i = 0; i < cellsEl.length; i++) {
    cellsEl[i].addEventListener("click", function () {
      console.log(i)
      if (
        cellsEl[i].classList.contains("end") &&
        !cellsEl[i].classList.contains("taken")
      ) {
        turnState(i);
      } else if (
        cellsEl[i + 7].classList.contains("taken") &&
        !cellsEl[i].classList.contains("taken")
      ) {
        turnState(i);
      } else {
        statusEl.textContent = "Can't go here";
        return;
      }
      checkBoard();
    });
  }
  turnCounter = -1
  turnTracker();
}

// Turn Tracker, adds animation for turn indicatior as Indi
function turnTracker() {
  turn *= -1;
  turnCounter += 1;
  if (turn === 1) {
    statusEl.textContent = `CONNECT 4! Player One's turn!`;
    playerOneEl.classList.add("indi3");
  } else if (turn === -1) {
    statusEl.textContent = `CONNECT 4! Player Two's turn!`;
    playerTwoEl.classList.add("indi4");
    //Test functionallity after for Tie checker
  } else if (turnCounter === 41 && checkBoard === false) {
    statusEl.textContent = `WELP,NOBODY WINS`;
  }
  setTimeout(removeIndi, 1600);
  function removeIndi() {
    playerOneEl.classList.remove("indi3");
    playerTwoEl.classList.remove("indi4");
  }
checkBoard()
}

//Check for win combos
function checkBoard() {
  for (let y = 0; y < winningCombos.length; y++) {
    const square1 = cellsEl[winningCombos[y][0]];
    const square2 = cellsEl[winningCombos[y][1]];
    const square3 = cellsEl[winningCombos[y][2]];
    const square4 = cellsEl[winningCombos[y][3]];
    if (
      square1.classList.contains("red") &&
      square2.classList.contains("red") &&
      square3.classList.contains("red") &&
      square4.classList.contains("red")
    ) {
      statusEl.textContent = "Player One Wins! Resetting board!";
      playerOneScore.textContent += "*";
      turn = 1;
      setTimeout(resetBoard, 3000);
    } else if (
      square1.classList.contains("green") &&
      square2.classList.contains("green") &&
      square3.classList.contains("green") &&
      square4.classList.contains("green")
    ) {
      statusEl.textContent = "Player Two Wins! Resetting board!";
      playerTwoScore.textContent += "*";
      turn = -1;
      setTimeout(resetBoard, 3000);
    }
  }
}

// Game reset
function resetGame() {
  statusEl.textContent = "Put the bunny back in the box.";
  resetBoard()
  playerOneScore.textContent = "";
  playerTwoScore.textContent = "";
  turn = -1;
}
//soft reset
function resetBoard() {
  for (let i = 0; i < cellsEl.length; i++) {
    cellsEl[i].innerHTML = "";
    cellsEl[i].classList.remove("green");
    cellsEl[i].classList.remove("red");
    cellsEl[i].classList.remove("taken");
    cellsEl[i].classList.add("empty");
  }
}