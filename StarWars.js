const words = [
  "KRENNIC",
  "CHIRRUT",
  "CHEWBACCA",
  "SKYWALKER",
  "PALPATINE",
  "TARKIN",
  "SYNDULLA",
  "ORGANA",
  "CASSIAN",
  "SABINE",
  "THRAWN",
  "ERSO",
  "SCARIF",
  "BOSSK",
  "DENGAR",
  "HONDO",
  "JEDHA",
  "MOTHMA",
  "ACKBAR",
  "GREEDO",
];

const maxWrongGuesses = 5;

let wordToGuess = "";
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;

function selectRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
  wordToGuess = selectRandomWord();
  guessedLetters = Array(wordToGuess.length).fill("_");
  wrongGuesses = 0;

  updateWordDisplay();

  updateStarWarsPicture();

  const lettersContainer = document.querySelector(".letters");
  while (lettersContainer.firstChild) {
    lettersContainer.removeChild(lettersContainer.firstChild);
  }

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const button = document.createElement("button");
    button.innerText = letter;
    button.addEventListener("click", function () {
      handleGuess(letter);
    });
    lettersContainer.appendChild(button);
  }

  // Clear any previous win/lose message
}
