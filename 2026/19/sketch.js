let grid = [];
let targetGrid = [];
let nextGrid = [];
let cellSize = 16;
let cols, rows;
const palettes = [
  'orangered', 
  'lime',
  'blue',
  'red',
  'yellow',
  'cyan',
  'magenta',
  'white',
  'orange',
];
let currentPalette;
const transitionSpeed = 0.08;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  frameRate(30);
  initGrid();
  currentPalette = ['black', random(palettes)];
}

function initGrid() {
  grid = [];
  targetGrid = [];
  nextGrid = [];
  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    targetGrid[x] = [];
    nextGrid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = random([0, 1]);
      targetGrid[x][y] = grid[x][y];
      nextGrid[x][y] = 0;
    }
  }
}

function draw() {
  background(0);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let a = targetGrid[x][y];
      let b = targetGrid[(x + 1) % cols][y];
      let c = targetGrid[x][(y + 1) % rows];

      let gate = floor(random(4));
      let result;

      switch (gate) {
        case 0: // AND
          result = a & b;
          break;
        case 1: // OR
          result = a | c;
          break;
        case 2: // XOR
          result = a ^ b;
          break;
        case 3: // NOT
          result = a ? 0 : 1;
          break;
      }

      nextGrid[x][y] = result;
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      targetGrid[x][y] = nextGrid[x][y];
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = lerp(grid[x][y], targetGrid[x][y], transitionSpeed);
    }
  }

  noStroke();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let c = lerpColor(color(currentPalette[1]), color(currentPalette[0]), grid[x][y]);
      fill(c);
      rect(x * cellSize, y * cellSize, cellSize - 2, cellSize - 2);
    }
  }
}

function mousePressed() {
  initGrid();
}
