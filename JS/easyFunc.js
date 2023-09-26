// --- typing functionality main js without timers ---

const typing_text = document.querySelector('.text-of-typing p');
const inputField = document.querySelector('.contain .input-field');
const errorTag = document.querySelector('.errors span');
const timeTag = document.querySelector('.time span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const accuracyTag = document.querySelector('.accuracy span');
const button = document.querySelector('button');
const level1 = document.getElementById('level1');
const level2 = document.getElementById('level2');
const level3 = document.getElementById('level3');
const level4 = document.getElementById('level4');
const level5 = document.getElementById('level5');

// --- declaring all variables ---
let characterIndex = 0;
let errors = 0;
let backspaces = 0;
let totalTypedCharacters = 0;
let timer;
let maxTime = 30;
let timeLeft = maxTime;
let isTyping = 0;
// Levels unlocked initially
let unlockedLevels = parseInt(localStorage.getItem('unlockedLevels')) || 1;

// Initialize a variable to keep track of the user's current level
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;

// Function to unlock a level and display a message
function unlockLevel(levelElement, levelNumber) {
  levelElement.addEventListener('click', function (event) {
    event.preventDefault();
    if (levelNumber <= unlockedLevels) {
      showMessage(`Welcome to Level ${levelNumber}`);
      currentLevel = levelNumber;
      window.location.href = `/easylev${currentLevel}.html`; // Redirect to the selected level
    } else {
      showMessage('Complete the previous level first.');
    }
  });
}

// Call the unlockLevel function for each level
// unlockLevel(level1, 1);
unlockLevel(level2, 2);
unlockLevel(level3, 3);
unlockLevel(level4, 4);
unlockLevel(level5, 5);

// Check criteria to unlock levels
function checkUnlockCriteria(userSpeed, userAccuracy) {
  if (currentLevel === 1 && unlockedLevels < 2) {
    // Check typing speed and accuracy criteria for level 1
    const requiredSpeedForLevel1 = 42;
    const requiredAccuracyForLevel1 = 81;

    if (userSpeed >= requiredSpeedForLevel1 && userAccuracy >= requiredAccuracyForLevel1) {
      if (unlockedLevels < 2) {
        showMessage('Level 2 is unlocked!');
        unlockedLevels = 2; // Unlock level 2
        localStorage.setItem('unlockedLevels', unlockedLevels);
      }
    }
  } else if (currentLevel === 2) {
    // Check typing speed and accuracy criteria for level 2
    const requiredSpeedForLevel2 = 44;
    const requiredAccuracyForLevel2 = 82;

    if (userSpeed >= requiredSpeedForLevel2 && userAccuracy >= requiredAccuracyForLevel2) {
      if (unlockedLevels < 3) {
        showMessage('Level 3 is unlocked!');
        unlockedLevels = 3; // Unlock level 3
        localStorage.setItem('unlockedLevels', unlockedLevels);
      }
    }
  }

  // Add similar checks for other levels
  else if (currentLevel === 3) {
    // Check typing speed and accuracy criteria for level 3
    const requiredSpeedForLevel3 = 46;
    const requiredAccuracyForLevel3 = 83;

    if (userSpeed >= requiredSpeedForLevel3 && userAccuracy >= requiredAccuracyForLevel3) {
      if (unlockedLevels < 4) {
        showMessage('Level 4 is unlocked!');
        unlockedLevels = 4; // Unlock level 4
        localStorage.setItem('unlockedLevels', unlockedLevels);
      }
    }
  } else if (currentLevel === 4) {
    // Check typing speed and accuracy criteria for level 4
    const requiredSpeedForLevel4 = 48;
    const requiredAccuracyForLevel4 = 84;

    if (userSpeed >= requiredSpeedForLevel4 && userAccuracy >= requiredAccuracyForLevel4) {
      if (unlockedLevels < 5) {
        showMessage('Level 5 is unlocked!');
        unlockedLevels = 5; // Unlock level 5
        localStorage.setItem('unlockedLevels', unlockedLevels);
      }
    }
  }
}

function calculateUserSpeed() {
  const typedCharacters = characterIndex - errors; // Number of correctly typed characters
  const timeInSeconds = maxTime - timeLeft; // Time taken in seconds

  // Calculate words per minute (WPM)
  const wpm = Math.round(typedCharacters / 5 / (timeInSeconds / 60));
  return wpm;
}
function calculateUserAccuracy() {
  const totalCharacters = characterIndex + backspaces; // Total characters typed (including backspaces)
  const incorrectCharacters = errors + backspaces; // Incorrect characters typed (including backspaces)

  // Calculate accuracy as a percentage
  const accuracy =
    ((totalCharacters - incorrectCharacters) / totalCharacters) * 100;
  return accuracy.toFixed(2); // Return accuracy rounded to 2 decimal places
}

// --- random paragraph generator ---
function randomParagraph() {
  let randomIndex = Math.floor(Math.random() * paragraphs.length);
  typing_text.innerHTML = '';

  paragraphs[randomIndex].split('').forEach((span) => {
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
  let typedCharacter = inputField.value.split('')[characterIndex];
  if (characterIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedCharacter == null) {
      //if user typed backspace
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

    characters.forEach((span) => span.classList.remove('active'));
    characters[characterIndex].classList.add('active');
    errorTag.innerText = errors;
    cpmTag.innerText = characterIndex - errors; //cpm will not count errors
    let wpm = Math.round(
      ((characterIndex - errors) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;

    // Calculate accuracy
    let accuracy = calculateAccuracy(totalTypedCharacters, errors, backspaces);
    accuracyTag.innerText = accuracy.toFixed(2) + '%';
  } else {
    inputField.value = '';
    const userSpeed = calculateUserSpeed();
    const userAccuracy = calculateUserAccuracy();
    console.log(userAccuracy, userSpeed);
    // Call checkUnlockCriteria after each typing test
    checkUnlockCriteria(userSpeed, userAccuracy);
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
    document.getElementById('timerMessage').textContent = 'Time is up!';
    playAlertSound();
  }

  if (timeLeft === 0) {
    clearInterval(timer);
    document.getElementById('timerMessage').textContent = 'TIME IS UP!!';
    playAlertSound();
  }
}

// play alert sound when timer reaches 0
function playAlertSound() {
  // Replace the sound file path with the actual path to your alert sound file
  var alertSound = new Audio('alert sound.mp3');
  alertSound.play();
}

// --- try again button to reset game ---
function resetGame() {
  randomParagraph();
  inputField.value = '';
  clearInterval(timer);
  timeLeft = maxTime;
  characterIndex = 0;
  errors = 0;
  backspaces = 0;
  totalTypedCharacters = 0;
  isTyping = 0;
  document.getElementById('timerMessage').textContent = ''; // Clear timer message

  // Reset metrics
  errorTag.innerText = '0';
  cpmTag.innerText = '0';
  wpmTag.innerText = '0';
  accuracyTag.innerText = '0.00%';
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
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// --- detect keyboard shortcuts on the home page ---
// --- to restart test ---
document.addEventListener('keydown', function (event) {
  // --- check if alt and n keys are pressed simultaneously ---
  if (event.altKey && event.key === 'n') {
    resetGame();
    document.getElementById('timerMessage').textContent = ''; // Clear timer message
  }
});

// Function to display a message
function showMessage(message) {
  alert(message);
}
