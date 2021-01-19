const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIALL_COLOR = "##2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white"; // set the canvas background color -> white, not transparent.
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIALL_COLOR;
ctx.fillStyle = INITIALL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log("createing path in: ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log("createing line in: ", x, y);
    ctx.lineTo(x, y); //create a line
    ctx.stroke();
  }
  //   console.log(x, y);
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  //   console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function handleCM(event) {
  event.preventDefault(); //hide context menu
}

function handleSaveClick() {
  //const img = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  //link.href = img;
  link.href = canvas.toDataURL();
  link.download = "my paint";
  console.log(link);
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//create array, color -> represent each item inside the array
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
