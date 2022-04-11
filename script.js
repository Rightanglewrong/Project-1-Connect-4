// Constants
const statusEl = document.getElementById("Status");
const playEl = document.querySelector("#play");
const resetEl = document.querySelector("#reset");
const playerOneEl = document.querySelector("#player1");
const playerTwoEl = document.querySelector("#player2");
const boardEl = document.querySelectorAll(".box");

//let board =

// [
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0],
// ]
const players = [1, -1];
let turn = -1;

statusEl.textContent =
  "Sorry boss, but there's only two men I trust. One of them's me. The other's not you";

//Event Listeners
playEl.addEventListener("click", playGame);
resetEl.addEventListener("click", resetGame);

//Game Init Fn
function playGame() {
  boardEl.forEach(function (slot) {
    slot.classList.remove("green");
    slot.classList.remove("red");
  });
  boardEl.forEach(function (slot) {
    slot.addEventListener("click", discPlacement);
  });
  turnTracker();
}

// Turn Tracker, adds animation for turn indicatior as Indi

function turnTracker() {
  turn *= -1;
  if (turn === 1) {
    statusEl.textContent = `CONNECT 4! Player One's turn!`;
    playerOneEl.classList.add("indi3");
  } else {
    statusEl.textContent = `CONNECT 4! Player Two's turn!`;
    playerTwoEl.classList.add("indi4");
  }
  setTimeout(removeIndi, 1600);

  function removeIndi() {
    playerOneEl.classList.remove("indi3");
    playerTwoEl.classList.remove("indi4");
  }
}

// Choice made
function discPlacement(e) {
  console.log(e.target);
  let selSlot = e.target;
  if (selSlot.classList.contains("empty")) {
    if (turn === 1) {
      selSlot.classList.remove("empty");
      selSlot.classList.add("red");
      selSlot.innerHTML = 1;
      turnTracker()
    } else if (turn === -1) {
      selSlot.classList.remove("empty");
      selSlot.classList.add("green");
      selSlot.innerHTML = -1;
      turnTracker()
    }
  }
}

// Game reset

function resetGame() {
  statusEl.textContent = "Put the bunny back in the box.";
  setTimeout(playGame, 1500);
}
