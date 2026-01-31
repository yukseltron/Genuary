let cols, rows;
let scale = 5;
let grid, nextGrid;
let t = 0;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  cols = floor(width / scale);
  rows = floor(height / scale);

  grid = makeGrid();
  nextGrid = makeGrid();

  for (let i = 0; i < 300; i++) {
    let x = floor(random(cols));
    let y = floor(random(rows));
    grid[x][y] = {
      state: random() > 0.5 ? 1 : 0,
      hue: random(360)
    };
  }
}

function draw() {
  background(0, 0, 0, 20);
  t++;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let cell = grid[x][y];
      let neighbors = countNeighbors(x, y);

      let mutation = noise(x * 0.1, y * 0.1, t * 0.01);
      let threshold = map(sin(t * 0.01 + mutation * TWO_PI), -1, 1, 2, 5);

      let nextState = cell.state;

      if (cell.state === 1 && (neighbors < threshold || neighbors > threshold + 2)) {
        nextState = 0;
      } else if (cell.state === 0 && neighbors === floor(threshold)) {
        nextState = 1;
      }

      if (random() < 0.001) {
        nextState = 1;
      }

      let nextHue = (cell.hue + random(-5, 5) + neighbors * 2) % 360;

      nextGrid[x][y] = {
        state: nextState,
        hue: nextHue
      };

      if (cell.state === 1) {
        noStroke();
        ellipse(x * scale, y * scale, scale);
      }
    }
  }

  swapGrids();
}

function countNeighbors(x, y) {
  let sum = 0;

  let moore = noise(t * 0.0002) > 0.5;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      if (!moore && abs(i) + abs(j) === 2) continue;

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row].state;
    }
  }
  return sum;
}

function makeGrid() {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = { state: 0, hue: random(360) };
    }
  }
  return arr;
}

function swapGrids() {
  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}
