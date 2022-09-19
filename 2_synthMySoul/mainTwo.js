const drumz = document.getElementById("drum-container");

const NOTES = {
  "C-4": 261.626,
  "D-4": 293.665,
  "E-4": 329.628,
  "F-4": 349.228,
  "G-4": 391.995,
  "A-4": 440.0,
  "B-4": 493.883,
  "C-5": 523.251,
};

const WAVEFORMS = ["sine", "square", "sawtooth", "triangle"];

let osc;

const waveSlider = document.getElementById("waveSlider");
// waveSlider.addEventListener("input", (e) => {
//   const val = e.target.value;
//   oscillator.frequency.value = val * 400;
// })


const pads = drumz.querySelectorAll(".key");
for (let i = 0; i < pads.length; i++) {
  pads[i].setAttribute("data-index", i);
}

for (const pad of pads) {
  pad.addEventListener("pointerdown", () => {
    const actx = new (AudioContext || webkitAudioContext)();
    if (!actx) throw "Not supported!";
    osc = actx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = NOTES[pad.dataset.note]; // Hz = middle A
    osc.connect(actx.destination);
    osc.start();
    pad.classList.add("playing");
  });

  pad.addEventListener("pointerup", () => {
    osc.stop();
    pad.classList.remove("playing");
  });
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}
