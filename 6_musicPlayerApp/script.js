// create songs list array
const songs = [
  "tanHop.mp3",
  "Semiotico.mp3",
  "Popa America.mp3",
  "Working Class.mp3",
  "Nos Vamos.mp3",
];

let songIndex = 3;

// select player buttons and elements
let playerImg = document.querySelector(".radio");
let playBtn = document.getElementById("play");
let playSVG = playBtn.querySelector("i.fa-solid");
let stopBtn = document.getElementById("stop");
let backBtn = document.getElementById("back");
let nextBtn = document.getElementById("next");

const progressBar = document.getElementById("progress");

let volDown = document.getElementById("volDown");
let volUp = document.getElementById("volUp");

// select section to show current audio 
const currentSong = document.querySelector("#currentSong");

// select audio input
const player = document.getElementById("player");
const source = document.getElementById("source");

// create title variable
let titleS;

// create list of available songs
function createSongList() {
  const list = document.createElement("div");
  for (let i = 0; i < songs.length; i++) {
    const item = document.createElement("a");
    item.appendChild(document.createTextNode(songs[i].slice(0, -4)));
    list.appendChild(item);
  }
  return list;
}

const songList = document.getElementById("songList");
songList.appendChild(createSongList());

const links = songList.querySelectorAll("a");
for (const link of links) {
  link.addEventListener("click", setSong);
  link.classList.add("song");
}

// when called the selected file will be played
function setSong(e) {
  titleS = e.target.innerText;
  source.src = `songs/${titleS}.mp3`;
  e.target.style.background = "#3a063e";
  currentSong.innerText = `Playing: ${titleS}`;
  player.load();
  player.play();
  playSVG.classList.remove("fa-play");
  playSVG.classList.add("fa-pause");
}

function setSong2() {
  titleS = songs[0];
  source.src = "songs/" + songs[0];
  currentSong.innerText = `Playing: ${titleS.slice(0, -4)}`;
  player.load();
  player.play();
}

backBtn.addEventListener("click", () => {
  console.log("back");  
});

nextBtn.addEventListener("click", () => {
  console.log("next")
})

// add click event on play button
playBtn.addEventListener("click", () => {
  player.readyState ? player.play() : setSong2();
  changePlayBtn();
});

// add click event on stop button
stopBtn.addEventListener("click", () => {
  player.pause();
  player.currentTime = 0;
  progressBar.value = 0;
  playSVG.classList.add("fa-play");
  playSVG.classList.remove("fa-pause");
});

function changePlayBtn() {
  if (playSVG.classList.contains("fa-play")) {
    playSVG.classList.remove("fa-play");
    playSVG.classList.add("fa-pause");
  } else {
    playSVG.classList.add("fa-play");
    playSVG.classList.remove("fa-pause");
    player.pause();
  }
}

// add volume slider input functionality
const slider = document.getElementById("volumeSlider");
slider.oninput = function (e) {
  const volume = e.target.value;
  player.volume = volume;
};

// volDown.addEventListener("pointerdown", () => {
//   console.log("down");
//   slider.value -= 0.01;
//   console.log(slider.value);
// });

// volUp.addEventListener("pointerdown", () => {
//   console.log("up");
//   slider.value += 0.1;
//   console.log(slider.value);
// });

// update state on progress bar when file is playing
function updateProgress() {
  if (player.currentTime > 0) {
    progressBar.value = (player.currentTime / player.duration) * 100;
  }

  player.addEventListener("ended", () => {
    playSVG.classList.add("fa-play");
    playSVG.classList.remove("fa-pause");
    progressBar.value = 0;
  });

  progressBar.addEventListener("click", (e) => {
    let current = (player.currentTime +=
      progressBar.value / player.currentTime);
    progressBar.value = current;
  });
}
