// JAVASCRIPT: Logica del gioco
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

// Tutte le possibili combinazioni per vincere
const winningConditions = [
  [0, 1, 2], // Orizzontale superiore
  [3, 4, 5], // Orizzontale centrale
  [6, 7, 8], // Orizzontale inferiore
  [0, 3, 6], // Verticale sinistra
  [1, 4, 7], // Verticale centrale
  [2, 5, 8], // Verticale destra
  [0, 4, 8], // Diagonale principale
  [2, 4, 6] // Diagonale secondaria
];

function handleCellClick(e) {
const clickedCell = e.target;
const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

// Se la cella è già occupata o il gioco è finito, ignora il clic
if (gameState[clickedCellIndex] !== "" || !isGameActive) {
return;
}

// Aggiorna lo stato interno e la grafica
gameState[clickedCellIndex] = currentPlayer;
clickedCell.textContent = currentPlayer;
clickedCell.classList.add(currentPlayer);

checkResult();
}

function checkResult() {
let roundWon = false;

for (let i = 0; i < winningConditions.length; i++) {
const [a, b, c] = winningConditions[i];
if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
roundWon = true;
break;
}
}

if (roundWon) {
statusDisplay.textContent = `Giocatore ${currentPlayer} ha vinto! 🎉`;
statusDisplay.style.color = "#4ade80"; // Verde vittoria
isGameActive = false;
return;
}

// Controllo pareggio (nessuna cella vuota)
if (!gameState.includes("")) {
statusDisplay.textContent = "Pareggio! 🤝";
statusDisplay.style.color = "#94a3b8";
isGameActive = false;
return;
}

// Cambia turno
currentPlayer = currentPlayer === "X" ? "O" : "X";
statusDisplay.textContent = `Turno del giocatore ${currentPlayer}`;
}

function resetGame() {
currentPlayer = "X";
gameState = ["", "", "", "", "", "", "", "", ""];
isGameActive = true;
statusDisplay.textContent = "Turno del giocatore X";
statusDisplay.style.color = "#f8fafc";

cells.forEach(cell => {
cell.textContent = "";
cell.classList.remove("X", "O");
});
}

// Aggiunge l'ascoltatore di eventi a ogni cella della griglia
cells.forEach(cell => cell.addEventListener("click", handleCellClick));