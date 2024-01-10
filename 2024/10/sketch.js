let cols, rows;
let resolution = 200;
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
  stroke('blue');
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let randomOffset = random(10);
      drawHexagon(x, y, 40, randomOffset);
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

function drawHexagon(x, y, size, randomOffset) {
  let angle = TWO_PI / 6;
  let halfSize = size / 2;
  let step = size / lines[counter];

  for (let i = 0; i < lines[counter] + randomOffset; i++) {
    for (let a = 0; a < TWO_PI; a += angle) {
      let x1 = x + cos(a) * halfSize;
      let y1 = y + sin(a) * halfSize;
      let x2 = x + cos(a + angle) * halfSize;
      let y2 = y + sin(a + angle) * halfSize;
      line(x1 + i + randomOffset, y1 + i + randomOffset, x2 - i, y2 - i);
    }
  }
}