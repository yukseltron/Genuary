let grid = [];
let w = 120;
let h = 120;
let scaleFactor = 6;

let t = 0;
let palette = [];

function setup() {
  createCanvas(w * scaleFactor, h * scaleFactor);
  noStroke();
  frameRate(12);

  // generate three random RGB colors for the palette (determined once at setup)
  for (let i = 0; i < 3; i++) {
    // avoid extremes to keep visible contrast
    let r = random(30, 230);
    let g = random(30, 230);
    let b = random(30, 230);
    palette[i] = color(r, g, b);
  }

  for (let x = 0; x < w; x++) {
    grid[x] = [];
    for (let y = 0; y < h; y++) {
      grid[x][y] = random();
    }
  }
}

function draw() {
  background(10);
  t += 0.02;

  updateGrid();
  drawGrid();
}

function updateGrid() {
  let next = [];

  for (let x = 0; x < w; x++) {
    next[x] = [];
    for (let y = 0; y < h; y++) {
      let self = grid[x][y];

      // neighbor sampling (wrap edges)
      let left = grid[(x - 1 + w) % w][y];
      let right = grid[(x + 1) % w][y];
      let up = grid[x][(y - 1 + h) % h];
      let down = grid[x][(y + 1) % h];

      // horizontal bias = scanline feel
      let flow = lerp(self, right, 0.4);

      // subtle oscillation
      let wave = sin(y * 0.15 + t) * 0.05;

      let value =
        flow * 0.6 +
        (up + down) * 0.15 +
        wave;

      // rare glitches
      if (random() < 0.0008) {
        value = random();
      }

      next[x][y] = constrain(value, 0, 1);
    }
  }

  grid = next;
}

function drawGrid() {
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let v = grid[x][y];

      let c;
  // use the palette colors determined in setup()
  if (v < 0.33) c = palette[0];
  else if (v < 0.66) c = palette[1];
  else c = palette[2];

      fill(c);
      rect(
        x * scaleFactor,
        y * scaleFactor,
        scaleFactor,
        scaleFactor
      );
    }
  }
}
