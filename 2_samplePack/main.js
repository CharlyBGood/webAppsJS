const tracks = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

let soundIndex = 0;

// let sound = document.getElementById("aPad");
let sound = document.getElementById("sound");
// let source = document.querySelectorAll("source.source");
let source = document.getElementById("source");

const drumz = document.getElementById("drum-container");

const pads = drumz.querySelectorAll(".key");
for (let i = 0; i < pads.length; i++) {
  pads[i].setAttribute("data-index", i);
}
for (const pad of pads) {
  pad.addEventListener("pointerdown", (e) => {
    soundIndex = pad.getAttribute("data-index");
    nameZ = e.target.innerText;
    source.src = `sounds/${nameZ}.wav`;
    sound.load();
    sound.play();
    console.log(source.src);
  });
}

// let aPad = document.querySelector("div.key");
// aPad.addEventListener("pointerdown", playing);

// function playing(e) {
//   console.log("played")
//   sound.play();
// }

function playSong() {
  loadSound(tracks[soundIndex]);
  sound.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
