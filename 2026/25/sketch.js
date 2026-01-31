let grid = [];
let nextGrid = [];
let colorField = [];

let palette = [];
let paletteZ = 0;

let cellSize = 5;
let cols, rows;
let z = 0;

function setup() {
  createCanvas(520, 520);
  colorMode(HSB, 360, 80, 100);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  frameRate(6);

  generatePalette();
  initGrids();
}

function generatePalette() {
  palette = [];
  let count = floor(random(4, 7));
  for (let i = 0; i < count; i++) {
    palette.push({
      h: random(360),
      s: random(40, 80),
      b: random(60, 100)
    });
  }
}

function initGrids() {
  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    nextGrid[x] = [];
    colorField[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = random([0, 1]);
      colorField[x][y] = 0;
    }
  }
}

function draw() {
  background(0);
  z += 0.01;
  paletteZ += 0.002;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let n = noise(x * 0.03, y * 0.03, paletteZ);
      colorField[x][y] = floor(map(n, 0, 1, 0, palette.length));
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let a = grid[x][y];
      let b = grid[(x + 1) % cols][y];
      let c = grid[x][(y + 1) % rows];

      let gate = floor(random(4));
      let result;

      switch (gate) {
        case 0: result = a & b; break;       // AND
        case 1: result = a | c; break;       // OR
        case 2: result = a ^ b; break;       // XOR
        case 3: result = a ? 0 : 1; break;   // NOT
      }

      nextGrid[x][y] = result;
    }
  }

  noStroke();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = nextGrid[x][y];

      if (grid[x][y] === 1) {
        let c = palette[colorField[x][y] % palette.length];
        fill(c.h, c.s, c.b);
      }

      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}