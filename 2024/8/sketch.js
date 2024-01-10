let cols, rows;
let resolution = 50;
let lines = [];
let counter = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width / resolution;
  rows = height / resolution;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      lines.push(i + j);
    }
  }

  frameRate(10);
}

function draw() {
  background('orangered');
  stroke('beige');
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      drawSquare(x, y, 50);
      counter = counter === lines.length - 1 ? 0 : counter + 1;
    }
  }
}

function drawSquare(x, y, size) {
  let step = size / lines[counter];

  for (let i = 0; i < lines[counter]; i++) {
    // Vertical lines
    line(x + i * step, y, x + size , y + i * step);
    rotate(frameCount * 0.0001);
    // Horizontal lines
    line(x, y + i * step, x + i * step, y + size);
  }
}
