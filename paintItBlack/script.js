// import * as randomColor from "./randomColor.js";

// crear canvas 2d
let canvas = document.getElementById("area");
let ctx = canvas.getContext("2d");

// crear variables de posición de pincel y estado de dibujo
let stage;
let x;
let y;
let colorX = "#f3ebdc";
let size;
let magicButton = false;
let bgrBtn1 = document.getElementById("bgr_hide");
let bshBtn = document.getElementById("bsh_hide");
let lastAction;

// definir tamaño de canvas segun window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// añadir eventos de mouse / touch
canvas.addEventListener("pointerdown", pointerDown, false);
canvas.addEventListener("pointermove", pointerMove, false);
canvas.addEventListener("pointerup", pointerUp, false);

// Generar color random 
function rand(min, max) {
  let randomNumbs = min + Math.random() * (max - min);
  return randomNumbs;
}

let colorZ = function randColorHsl() {
  let h = rand(0, 360);
  let s = rand(25, 100);
  let l = rand(15, 75);
  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

// redimensionar canvas según viewport
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// cambiar color de fondo al canvas
let bgrPckr = document.getElementById("bgr_color");
bgrPckr.addEventListener("input", bgrChange);

function bgrChange() {
  canvas.style.backgroundColor = bgrPckr.value;
  bgrBtn1.style.backgroundColor = bgrPckr.value;
}

// cambiar color a pincel
let brushPckr = document.getElementById("brush_color");
brushPckr.addEventListener("input", brushColor);

function brushColor() {
  colorX = brushPckr.value;
  ctx.globalCompositeOperation = "source-over";
  bshBtn.style.backgroundColor = brushPckr.value;
  magicButton = false;
}

// seleccionar pincel mágico
let brushMagic = document.getElementById("magic_button");
brushMagic.addEventListener("click", brushMc);

function brushMc() {
  
  magicButton = !magicButton;
}

// seleccionar goma de borrar
let brushErase = document.getElementById("brush_erase");
brushErase.addEventListener("click", eraseDraw);

function eraseDraw() {
  ctx.globalCompositeOperation = "destination-out";
  magicButton = false;
}

// cambiar tamaño a pincel
let sizeB = document.getElementById("range");
sizeB.addEventListener("input", brushSize);

function brushSize() {
  size = sizeB.value;
}

// recargar canvas
let reload = document.getElementById("reload");
reload.addEventListener("click", reloadCanvas);

function reloadCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bshBtn.style.backgroundColor = "#12e671d0";
  bgrBtn1.style.backgroundColor = "#e69b12d0";
  brushPckr.value = "#000000";
  bgrPckr.value = "#000000";
}

// deshacer trazo

let undoBtn = document.getElementById("undo");
undoBtn.addEventListener("click", undoTrace);

function undoTrace(e) {
  // e.preventDefault()
  pointerMove(lastAction)
  
  console.log(lastAction)
  
}

// funciones para dibujar según se mueve el puntero
function pointerDown(ev) {
  stage = 1;
  x = ev.layerX;
  y = ev.layerY;
  console.log(ev.x)
  ev.preventDefault();
}

function pointerMove(ev) {
  if (stage == 1) {
    if (magicButton) {
      colorX = colorZ();
      ctx.globalCompositeOperation = "source-over";
    }
    drawLine(colorX, x, y, ev.layerX, ev.layerY, ctx);
    
  }
  x = ev.layerX;
  y = ev.layerY;
}

function pointerUp() {
  stage = 0;
}

function drawLine(color, xini, yini, xfin, yfin, ctx) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.moveTo(xini, yini);
  ctx.lineTo(xfin, yfin);
  ctx.stroke();
  ctx.closePath();
}

// NAVBAR

// window.onscroll = function() {smoothFunc()};

// let navbar = document.getElementById('container');

// let sticky = navbar.offsetTop;

// function smoothFunc() {
//     if (window.pageYOffset) {
//         navbar.classList.add('sticky');
//     } else {
//         navbar.classList.remove('sticky');
//     }
// }

// -------------------
