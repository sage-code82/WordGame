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
  "ZUCKUSS",
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

  updateDeathStarGraphic();

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

  const messageContainer = document.querySelector(".message");
  messageContainer.innerText = "";
}

function updateWordDisplay() {
  const wordContainer = document.querySelector(".word");
  wordContainer.innerText = guessedLetters.join("");
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter)) {
    return;
  }

  let correctGuess = false;
  wordToGuess.split("").forEach((char, index) => {
    if (char === letter) {
      guessedLetters[index] = letter;
      correctGuess = true;
    }
  });

  if (!correctGuess) {
    wrongGuesses++;
    updateDeathStarGraphic();
  }

  updateWordDisplay();
  checkWinOrLose();
}

function updateDeathStarGraphic() {
  const deathStarContainer = document.querySelector(".DeathStar");
  deathStarContainer.innerHTML = `<img src="images/DeathStar${imageCount}.png" alt="DeathStar ${imageCount}">`;
  imageCount++;
}

function checkWinOrLose() {
  if (guessedLetters.join("") === wordToGuess) {
    const messageContainer = document.querySelector(".message");
    messageContainer.innerText = "You win!";
    const letterButtons = document.querySelectorAll(".letters button");
    letterButtons.forEach((button) => {
      button.disabled = true;
      button.removeEventListener("click", handleGuess);
    });
  } else if (wrongGuesses >= maxWrongGuesses) {
    const messageContainer = document.querySelector(".message");
    messageContainer.innerText = `You lose! The word was "${wordToGuess}".`;
    const deathStarContainer = document.querySelector(".DeathStar");
    deathStarContainer.innerHTML = `<img src="images/gameover.png" alt="gameover">`;
    const letterButtons = document.querySelectorAll(".letters button");
    letterButtons.forEach((button) => {
      button.disabled = true;
      button.removeEventListener("click", handleGuess);
    });
  }
}

window.addEventListener("load", startGame);
