let grid = [];
let nextGrid = [];
let colorField = [];
let palette = [];
let paletteColors = [];
let paletteZ = 0;
let cellSize = 5;
let cols, rows;
let z = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(HSB, 360, 80, 100);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  brush.load();
  generatePalette();
  initGrids();
}

function generatePalette() {
  palette = [];
  paletteColors = [];
  let count = floor(random(4, 7));
  for (let i = 0; i < count; i++) {
    let col = {
      h: random([0, random(360)]),
      s: random([0, random(40, 80)]),
      b: random([0, random(60, 100)])
    };
    palette.push(col);
    paletteColors.push(color(col.h, col.s, col.b));
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
  translate(-width/2, -height/2);
  
  z += 0.01;
  paletteZ += 0.002;

  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let n = noise(x * 0.03, y * 0.03, paletteZ);
      colorField[x][y] = floor(map(n, 0, 1, 0, paletteColors.length));
      
      let a = grid[x][y];
      let b = grid[(x + 1) % cols][y];
      let c = grid[x][(y + 1) % rows];
      
      let gate = floor(random(4));
      let result;
      
      switch (gate) {
        case 0: result = a & b; break;       
        case 1: result = a | c; break;       
        case 2: result = a ^ b; break;       
        case 3: result = a ? 0 : 1; break;   
      }
      
      nextGrid[x][y] = result;
      grid[x][y] = result;
      
      if (result === 1) {
        stroke(paletteColors[colorField[x][y] % paletteColors.length]);
        strokeWeight(200);
        line(x * cellSize, y * cellSize, x * cellSize + cellSize, y * cellSize + cellSize);
      }
    }
  }
}