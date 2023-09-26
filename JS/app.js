// --- typing functionality main js without timers ---

const typing_text = document.querySelector('.text-of-typing p');
const inputField = document.querySelector('.contain .input-field');
const errorTag = document.querySelector('.errors span');
const timeTag = document.querySelector('.time span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const accuracyTag = document.querySelector('.accuracy span');
const button = document.querySelector('button');

// --- declaring all variables ---
let characterIndex = 0;
let errors = 0;
let backspaces = 0;
let totalTypedCharacters = 0;
let timer;
let maxTime = 30;
let timeLeft = maxTime;
let isTyping = 0;

// --- random paragraph generator ---
function randomParagraph() {
  let randomIndex = Math.floor(Math.random() * paragraphs.length);

  typing_text.innerHTML = "";

  paragraphs[randomIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typing_text.innerHTML += spanTag;
  });

  typing_text.querySelectorAll('span')[0].classList.add('active');

  document.addEventListener('keydown', () => inputField.focus());
  typing_text.addEventListener('click', () => inputField.focus());
}
randomParagraph();

function initTyping() {
  const characters = typing_text.querySelectorAll('span');

  let typedCharacter = inputField.value.split("")[characterIndex];

  if (characterIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedCharacter == null) { //if user typed backspace
      characterIndex--;

      if (characters[characterIndex].classList.contains('incorrect')) {
        errors--;
      }

      characters[characterIndex].classList.remove('correct', 'incorrect');

      backspaces++;
    } else {
      if (characters[characterIndex].innerText === typedCharacter) {
        characters[characterIndex].classList.add('correct');
      } else {
        errors++;
        characters[characterIndex].classList.add('incorrect');
      }
      characterIndex++;
      totalTypedCharacters++;
    }

    characters.forEach(span => span.classList.remove('active'));
    characters[characterIndex].classList.add('active');

    errorTag.innerText = errors;

    cpmTag.innerText = characterIndex - errors; //cpm will not count errors

    let wpm = Math.round((((characterIndex - errors) / 5) / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;

    // Calculate accuracy
    let accuracy = calculateAccuracy(totalTypedCharacters, errors, backspaces);
    accuracyTag.innerText = accuracy.toFixed(2) + "%";
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

inputField.addEventListener('input', initTyping);

// --- timer ---
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
    document.getElementById("timerMessage").textContent = "Time is up!";
    playAlertSound();
  }

  if (timeLeft === 0) {
    clearInterval(timer);
    document.getElementById("timerMessage").textContent = "TIME IS UP!!";
    playAlertSound();
  }
}

// play alert sound when timer reaches 0
function playAlertSound() {
  // Replace the sound file path with the actual path to your alert sound file
  var alertSound = new Audio("alert sound.mp3");
  alertSound.play();
}

// --- try again button to reset game ---
function resetGame() {
  randomParagraph();
  inputField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  characterIndex = 0;
  errors = 0;
  backspaces = 0;
  totalTypedCharacters = 0;
  isTyping = 0;
  document.getElementById("timerMessage").textContent = ""; // Clear timer message

  // Reset metrics
  errorTag.innerText = "0";
  cpmTag.innerText = "0";
  wpmTag.innerText = "0";
  accuracyTag.innerText = "0.00%";
}

button.addEventListener('click', resetGame);

// Function to calculate accuracy
function calculateAccuracy(typedCharacters, errors, backspaces) {
  let totalTyped = typedCharacters + backspaces;
  if (totalTyped === 0) {
    return 0;
  }

  let accuracy = ((typedCharacters - errors) / totalTyped) * 100;
  return accuracy;
}

// Smooth scrolling when clicking on about link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// --- detect keyboard shortcuts on the home page ---

// --- to restart test ---
document.addEventListener('keydown', function(event) {

  // --- check if alt and n keys are pressed simultaneously ---
  if (event.altKey && event.key === 'n') {
    // var homeLink = document.getElementById('shortcut-home');
    // if (homeLink) {
    //   homeLink.click();
    // }
    resetGame();
    document.getElementById("timerMessage").textContent = ""; // Clear timer message
  }
});