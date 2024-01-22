const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const dataYourScore = document.querySelector("[data-your-score]");
const dataComputerScore = document.querySelector("[data-computer-score]");


SELECTIONS = [
  {
    name: "rock",
    emoji: "✊ Rock",
    beats: "scissors"
  },
  {
    name: "papper",
    emoji: "✋ Paper",
    beats: "rock"
  },
  {
    name: "scissors",
    emoji: "✌️ Scissors",
    beats: "papper"
  }
]

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener("click", e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    makeSelection(selection)
  })
})

function makeSelection(selection) {
  computerSelection = randomSelection()
  const yourWiner = isWinner(selection, computerSelection);
  const computerWiner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWiner);
  addSelectionResult(selection, yourWiner);

  if (yourWiner) incrementScore(dataYourScore)
  if (computerWiner) incrementScore(dataComputerScore)
  console.log(computerSelection);
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerHTML = selection.emoji;
  div.classList.add("results-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}



function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex]
}