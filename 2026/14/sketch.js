let grid = [];
let nextGrid = [];
let cellSize = 100;
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
  'black',
  'orange',
];
let currentPalette;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  frameRate(4);
  initGrid();
  currentPalette = [random(palettes), random(palettes)];
}

function initGrid() {
  grid = [];
  nextGrid = [];
  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    nextGrid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = random([0, 1]);
      nextGrid[x][y] = 0;
    }
  }
}

function draw() {
  background(0);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let a = grid[x][y];
      let b = grid[(x + 1) % cols][y];
      let c = grid[x][(y + 1) % rows];

      let gate = floor(random(4));
      let result;

      switch (gate) {
        case 0: 
          result = a & b;
          break;
        case 1: 
          result = a | c;
          break;
        case 2: 
          result = a ^ b;
          break;
        case 3: 
          result = a ? 0 : 1;
          break;
      }

      nextGrid[x][y] = result;
    }
  }

  noStroke();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = nextGrid[x][y];
      fill(grid[x][y] ? currentPalette[0] : currentPalette[1]);
      rect(x * cellSize, y * cellSize, cellSize*5, cellSize*5, 20);
    }
  }
}

function mousePressed() {
  initGrid();
}
