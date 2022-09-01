//---------------------------------------------------SELECTORS
let startButton = document.querySelector(".start");
let title = document.querySelector(".title_screen");

let welcome = document.querySelector(".welcome");
let welcomeText = document.querySelector(".welcome_text");

let chatText = document.querySelector(".chatText");

//SHOW TITLE SCREEN AND HIDE IT
const hideUnhide = (element) => {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    setTimeout(function () {
      element.classList.remove("visuallyhidden");
    }, 20);
  } else {
    element.classList.add("visuallyhidden");
    element.addEventListener(
      "transitionend",
      function (e) {
        element.classList.add("hidden");
      },
      {
        capture: false,
        once: true,
        passive: false,
      }
    );
  }
};

startButton.addEventListener("click", () => {
  audio.Title.stop();
  audio.Start.play();
  setTimeout(() => {
    audio.Map.play();
  }, 7000);
  hideUnhide(title);
  setTimeout(() => {
    cycleWelcome();
  }, 2000);
});

function cycleWelcome() {
  hideUnhide(welcomeText);
  setTimeout(() => {
    hideUnhide(welcomeText);
  }, 3000);
  setTimeout(() => {
    hideUnhide(welcome);
    gameStat.running = true;
  }, 4500);
}

// var i = 0;
// var txt = "Lorem ipsum dummy text blabla.";

// function typeWriter() {
//   if (i < txt.length) {
//     chatText.innerHTML += txt.charAt(i);
//     i++;
//     setTimeout(typeWriter, speed);
//   }
// }
