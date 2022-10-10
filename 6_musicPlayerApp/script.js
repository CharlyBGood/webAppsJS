// create songs list array
const songs = [
  "tanHop",
  "Semiotico",
  "Pianotec",
  "Samp",
  "Popa America",
  "Working Class",
  "Nos Vamos",
];

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

let songIndex = 0;

// create list of available songs
function createSongList() {
  const list = document.createElement("div");
  for (let i = 0; i < songs.length; i++) {
    const item = document.createElement("a");
    item.appendChild(document.createTextNode(songs[i]));
    item.setAttribute("data-index", i);
    list.appendChild(item);    
  }
  return list;
}

// display songlist on DOM
const songList = document.getElementById("songList");
songList.appendChild(createSongList());

// add eventlistener into links
// change songIndex value to be the same as data-index attribute on links
const links = songList.querySelectorAll("a");
for (const link of links) {  
  link.addEventListener("click", function(e) {    
    songIndex = link.getAttribute("data-index")
    titleS = e.target.innerText;  
    source.src = `songs/${titleS}.mp3`;  
    e.target.style.background = "#3a063e";
    currentSong.innerText = `Song: ${titleS}`;    
    player.load();
    player.play();
    playSVG.classList.remove("fa-play");
    playSVG.classList.add("fa-pause");    
  });  
}

// when called the selected file will be played
function setSong(song) {
  source.src = `songs/${song}.mp3`;
  currentSong.innerText = `Song: ${song}`;
  player.load();
}

backBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  setSong(songs[songIndex]);
  player.play();
});

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  setSong(songs[songIndex]);
  player.play();
});

function playSong() {
  setSong(songs[songIndex]);
  playSVG.classList.remove("fa-play");
  playSVG.classList.add("fa-pause");
  player.play();  
}

function pauseSong() {
  playSVG.classList.add("fa-play");
  playSVG.classList.remove("fa-pause");
  player.pause();
}

// add click event on play button
playBtn.addEventListener("click", playOrNot);

function playOrNot() {
  const isPlaying = playSVG.classList.contains("fa-pause");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }  
}

// add click event on stop button
stopBtn.addEventListener("click", playerStop);
function playerStop() {
  player.pause();
  player.currentTime = 0;
  progress.style.width = "0%";
  playSVG.classList.add("fa-play");
  playSVG.classList.remove("fa-pause");
}

// }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

// add volume slider input functionality
const slider = document.getElementById("volumeSlider");
player.volume = 0.5;
slider.oninput = function (e) {
  const volume = e.target.value;
  player.volume = volume / 100;
};

volDown.addEventListener("pointerdown", () => {
  slider.value--;
  player.volume = slider.value / 100;
});

volUp.addEventListener("pointerdown", () => {
  slider.value++;
  player.volume = slider.value / 100;
});

// customize mute audio button
let volOnOff = document.getElementById("volOnOff");

volOnOff.addEventListener("click", () => {
  volOnOff.classList.add("off");
  if (volOnOff.classList.contains("on")) {
    volOnOff.classList.remove("on");
    volOnOff.innerHTML = "&#128263;";
    player.volume = 0;
  } else {
    player.volume = slider.value / 100;
    console.log(slider.value);
    volOnOff.classList.remove("off");
    volOnOff.classList.add("on");
    volOnOff.innerHTML = "&#128266;";
  }
});

// set behaviour when the audio track ends
player.addEventListener("ended", () => {
  playSVG.classList.add("fa-play");
  playSVG.classList.remove("fa-pause");
  progress.style.width = "0%";
  currentSong.innerText = "";
  durStart.innerText = "-";
  durEnd.innerText = "-";
});

// convert audio duration and currentTime and convert the value into traditional displaying min/secs
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

// create custom progress bar and add eventlisteners to move to with mouseclick
player.addEventListener("timeupdate", updateProgress);

let progress = document.getElementById("progress");

function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

let progressContainer = document.querySelector(".progress-container");

progressContainer.addEventListener("pointerdown", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  let duration = Math.floor(player.duration);
  player.currentTime = (clickX / width) * duration;
});
