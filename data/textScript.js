let kidSpeak = [
  {
    text: "My mom tells me I am too young to drink cafecitos...",
  },
  {
    text: "But I drink them anyways, it helps me practice.",
  },
  {
    text: "When i grow up I want to be a knight!",
  },
];

let kidScriptCount = 0;
let kidScriptIndex = 0;

let duckSpeak = [
  {
    text: "Hey.. dont tell anyone you saw me here..",
  },
  {
    text: "I'm trying to hitch a ride on this wagon disguised as a barrel..",
  },
];

let duckScriptCount = 0;
let duckScriptIndex = 0;

let textField = document.querySelector(".chatUi");

function showChatUi() {
  textField.classList.remove("hidden");
}
function hideChatUi() {
  textField.classList.add("hidden");
}

function writeText(obj) {
  gameStat.speaking = true;
  let text = obj.text;
  let i = 0;
  let speed = 60; //typing speed

  chatText.innerHTML = "";

  let writing = setInterval(() => {
    audio.Typing.play();
  }, 100);
  setTimeout(() => {
    typeWriter();
  }, 300);
  function typeWriter() {
    if (i < text.length) {
      chatText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
    if (i == text.length) {
      clearInterval(writing);
    }
  }
}

//----------------------------------------------------------
