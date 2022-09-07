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
  console.log("next");
});

// add click event on play button
playBtn.addEventListener("click", () => {
  player.readyState ? player.play() : setSong2();
  changePlayBtn();
});

// add click event on stop button
stopBtn.addEventListener("click", () => {
  player.pause();
  player.currentTime = 0;
  // progressBar.value = 0;
  progress.style.width = "0%"
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

let volOnOff = document.getElementById("volOnOff");

volOnOff.addEventListener("click", () => {
  volOnOff.classList.add("off");
  if (volOnOff.classList.contains("on")) {
    volOnOff.classList.remove("on");
    volOnOff.innerHTML = "&#128263;";
    player.volume = 0;
  } else {
    player.volume = 1;
    volOnOff.classList.remove("off");
    volOnOff.classList.add("on");
    volOnOff.innerHTML = "&#128266;";
  }
});

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

player.addEventListener("ended", () => {
  playSVG.classList.add("fa-play");
  playSVG.classList.remove("fa-pause");
  progressBar.value = 0;
  currentSong.innerText = "";
  durStart.innerText = "-";
  durEnd.innerText = "-";
  playBtn.addEventListener("click", () => {
    currentSong.innerText = `Playing: ${titleS}`;
  });
});

let durStart = document.querySelector(".durationStart");
let durEnd = document.querySelector(".durationEnd");

const calcTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const retSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${retSecs}`;
};

player.addEventListener("timeupdate", () => {
  if (player.readyState > 0) {
    durStart.innerText = calcTime(player.currentTime);
    durEnd.innerText = calcTime(player.duration);
  }
});

// player.addEventListener("timeupdate", () => {  
//   if (player.currentTime > 0) {
//     progressBar.value = (player.currentTime / player.duration) * 100;
//   }  
//   progressBar.addEventListener("click", (e) => {    
//     player.currentTime = player.currentTime +=
//       progressBar.value / player.duration;       
//   });
// });

player.addEventListener("timeupdate", updateProgress);

let progress = document.getElementById("progress");

function updateProgress(e) {
  console.log(player.currentTime)  
  const progressPercent = (player.currentTime / player.duration) * 100;
  progress.style.width = `${progressPercent}%`
}

let progressContainer = document.querySelector("div.progress-container");

progressContainer.addEventListener("click", (e) => {
  console.log("clicked on progress")
  const width = this.clientWidth;
  const clickX = e.offsetX;
  console.log(clickX);
  player.currentTime = (clickX / width) * player.duration;
})
