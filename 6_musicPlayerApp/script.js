const songs = [
  "charlybgood-music-1.mp3",
  "charlybgood-music-2.mp3",
  "charlybgood-music-3.mp3",
  "charlybgood-music-4.mp3",
  "charlybgood-music-5.mp3",
  "charlybgood-music-6.mp3",
];

let playBtn = document.getElementById("play");
let pauseBtn = document.getElementById("pause");
let stopBtn = document.getElementById("stop");
let playerImg = document.querySelector(".radio");

const progressBar = document.getElementById("progress");

const player = document.getElementById("player");

const source = document.getElementById("source");

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

function setSong(e) {
  playerImg.classList.remove("pulse");
  source.src = "songs/" + e.target.innerText;  
  e.target.style.background = "#3a063e"
//   currentSong.innerText = `Now playing: ${e.target.innerText}`;
  player.load();
  player.play();
  playerImg.classList.add("pulse");  
}

playBtn.addEventListener("click", () => {
  player.readyState
    ? player.play()
    : console.log("your motherfkn function works!");
});

pauseBtn.addEventListener("click", () => player.pause());

stopBtn.addEventListener("click", () => {
  player.load();
  progressBar.value = "0";
});

const slider = document.getElementById("volumeSlider");
slider.oninput = function (e) {
  const volume = e.target.value;
  console.log(e.target.value);
  player.volume = volume;
};

function updateProgress() {
  if (player.currentTime > 0) {
    progressBar.value = (player.currentTime / player.duration) * 100;
  }
}
