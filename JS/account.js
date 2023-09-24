// --- login slide ---

var loginform = document.getElementById("loginform");
var suform = document.getElementById("suform");
var active = document.getElementById("active");
function signup() {
    suform.style.transform = "translateX(0px)";
    loginform.style.transform = "translateX(0px)";
    active.style.transform = "translateX(100px)";
}
function login() {
    suform.style.transform = "translateX(300px)";
    loginform.style.transform = "translateX(300px)";
    active.style.transform = "translateX(0px)";
}

// --- password reveal eye button ---
// function myFunction() {
//     var x = document.getElementById("pwd");
//     if (x.type === "password") {
//         x.type = "text";
//     }
//     else {
//         x.type = "password";
//     }
// }

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