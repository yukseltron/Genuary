let cols, rows;
let resolution = 50;
let lines = [];
let counter = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width / resolution;
  rows = height / resolution;
  for (let i = 0; i < cols/2; i++) {
    for (let j = 0; j < rows/2; j++) {
      lines.push(i + j);
    }
  }

  frameRate(10);
}

function draw() {
  background('lightgrey');
  stroke('orangered');
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let randomOffset = random(10);
      drawSquare(x, y, 40, randomOffset);
      counter = counter === lines.length - 1 ? 0 : counter + 1;
    }
  }
}

function drawSquare(x, y, size, randomOffset) {
  let step = size / lines[counter];

  for (let i = 0; i < lines[counter]+randomOffset; i++) {
    // Vertical lines
    line(x + i * step, y, x + size , y + i * step);
    // Horizontal lines
    line(x, y + i * step, x + i * step, y + size);
  }
}
