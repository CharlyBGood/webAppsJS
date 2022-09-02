// create songs list array
const songs = [
  "tanHop.mp3",
  "Semiotico.mp3",
  "Popa America.mp3",
  "Working Class.mp3",
  "Nos Vamos.mp3",
];

// select player buttons and elements
let playerImg = document.querySelector(".radio");
let playBtn = document.getElementById("play");
let pauseBtn = document.getElementById("pause");
let stopBtn = document.getElementById("stop");
let backBtn = document.getElementById("backward");

const progressBar = document.getElementById("progress");

let volDown = document.getElementById("volDown");
let volUp = document.getElementById("volUp");

// select audio input
const player = document.getElementById("player");
const source = document.getElementById("source");

// create title variable
let titleS;


// select element to show current file name and create list of available songs
const currentSong = document.querySelector("#currentSong");

function createSongList() {
  const list = document.createElement("div");
  for (let i = 0; i < songs.length; i++) {
    const item = document.createElement("a");
    item.appendChild(document.createTextNode(songs[i]));
    list.appendChild(item);        
  }
  return list;
}

const songList = document.getElementById("songList");
songList.appendChild(createSongList());

const links = document.querySelectorAll("a");
for (const link of links) {
  link.addEventListener("click", setSong);
}

// when called the selected file will be played
function setSong(e) {
  titleS = e.target.innerText;
  source.src = "songs/" + titleS;
  e.target.style.background = "#3a063e";
  currentSong.innerText = `#${titleS}`;
  player.load();
  player.play();
}

function setSong2() {
  titleS = songs[0];  
  source.src = "songs/" + songs[0];
  currentSong.innerText = `#${titleS.slice(0, -4)}`;
  player.load();
  player.play();
}


backBtn.addEventListener("click", prevSong);
function prevSong() {
  console.log("back")  
  player.load()
  player.play()
}

// add click event on play button
playBtn.addEventListener("click", () => {
  player.readyState ? player.play() : setSong2();
});

// add click event on pause button
pauseBtn.addEventListener("click", () => player.pause());

// add click event on stop button
stopBtn.addEventListener("click", () => {
  player.load();
  progressBar.value = "0";
});

// add volume slider input functionality
const slider = document.getElementById("volumeSlider");
slider.oninput = function (e) {
  const volume = e.target.value;
  player.volume = volume;
};

volDown.addEventListener("pointerdown", () => {
  console.log("down");
  slider.value -= 0.01;
  console.log(slider.value);
});

volUp.addEventListener("pointerdown", () => {
  console.log("up");
  slider.value += 0.01;
  console.log(slider.value);
});

// update state on progress bar when file is playing
function updateProgress() {
  if (player.currentTime > 0) {
    progressBar.value = (player.currentTime / player.duration) * 100;
  }

  progressBar.addEventListener("click", (e) => {
    player.currentTime += progressBar.value / player.currentTime;
    console.log(progressBar.value);
  });
}
