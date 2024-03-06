const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const dataYourScore = document.querySelector("[data-your-score]");
const selections = document.querySelector(".selections");
// const dataComputerScore = document.querySelector("[data-computer-score]");

const src1 = document.querySelector(".src1");
const src2 = document.querySelector(".src2");
const resultSection = document.querySelector(".result-section");
const resultStatus = document.querySelector(".result-status");
const playAgain = document.querySelector(".play-again");

let SELECTIONS = [
  {
    name: "rock",
    emoji: "https://raw.githubusercontent.com/ikromui/rock-paper-scissors/main/asstets/rock.png",
    beats: "scissors"
  },
  {
    name: "papper",
    emoji: "https://raw.githubusercontent.com/ikromui/rock-paper-scissors/main/asstets/paper.png",
    beats: "rock"
  },
  {
    name: "scissors",
    emoji: "https://raw.githubusercontent.com/ikromui/rock-paper-scissors/main/asstets/scissors.png",
    beats: "papper"
  }
]



selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener("click", e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    makeSelection(selection)

    document.querySelector("body").style = `
      pointer-events: none;
    `
    selectionButton.classList.add("selectedButton")

    setTimeout(() => {
      resultSection.classList.add("Resultshow")
      selections.classList.add("hide")

      document.querySelector("body").style = `
        pointer-events: unset;
      `
      setTimeout(() => {
        resultSection.classList.add("Animation")
      }, 1000);
    }, 1400);
  })
  playAgain.addEventListener("click", e => {
    resultSection.classList.remove("Animation")
    resultSection.classList.remove("Resultshow")
    selections.classList.remove("hide")
    selectionButton.classList.remove("selectedButton")
  })
})

function addSelectionResult(selection, computerSelection, winner, computerWiner) {
  src1.src = selection.emoji;
  src2.src = computerSelection.emoji;
  if (computerWiner) resultStatus.innerHTML = "You lost";
  if (winner) resultStatus.innerHTML = "You won";
  if (computerWiner === winner) resultStatus.innerHTML = "Draw!"
}

function makeSelection(selection) {
  computerSelection = randomSelection()
  const yourWiner = isWinner(selection, computerSelection);
  const computerWiner = isWinner(computerSelection, selection);

  addSelectionResult(selection, computerSelection, yourWiner, computerWiner);

  if (yourWiner) incrementScore(dataYourScore)
  console.log(computerSelection);
}

function incrementScore(scoreSpan) {
  setTimeout(() => {
    scoreSpan.innerHTML = parseInt(scoreSpan.innerText) + 1;
  }, 3000);
}



function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex]
}
