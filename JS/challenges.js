document.getElementById("play").addEventListener("click", function () {
  var selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
  if (selectedDifficulty) {
      var difficultyValue = selectedDifficulty.value;
      window.location.href = difficultyValue + '.html'; // Redirect to the corresponding HTML page
  } else {
      alert("Please select a difficulty level.");
  }
});

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

  