let boxes = [];
let t = 0;

const CELL = 8;
const DEPTH = 2;

function setup() {
  createCanvas(600, 600);
  pixelDensity(10);
  rectMode(CORNER);

  let cols = floor(width / CELL);
  let rows = floor(height / CELL);

  for (let i = 0; i < 120; i++) {
    let w = int(random(4, 18));
    let h = int(random(4, 18));

    boxes.push(new PixelBox(
      int(random(cols - w)) * CELL,
      int(random(rows - h)) * CELL,
      w,
      h,
      DEPTH
    ));
  }
}

function draw() {
  background(8, 10, 12, 50);
  t += 0.05;

  for (let b of boxes) {
    b.update();
    b.display();
  }
}

class PixelBox {
  constructor(x, y, w, h, depth) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.depth = depth;

    this.seed = random(1000);
    this.phase = random(TWO_PI);
  }

  update() {
    this.jitter =
      int(map(noise(this.seed, t), 0, 1, -1, 1));

    this.breathe =
      sin(t + this.phase) > 0 ? 1 : 0;
  }

  display() {
    push();
    translate(
      this.x + this.jitter * CELL,
      this.y + this.jitter * CELL
    );

    stroke('lime');
    strokeWeight(1);
    noFill();

    this.drawRecursive(0, 0, this.w, this.h, this.depth);
    pop();
  }

  drawRecursive(x, y, w, h, d) {
    // Snap everything to grid
    let px = x * CELL;
    let py = y * CELL;
    let pw = w * CELL;
    let ph = h * CELL;

    rect(px, py, pw, ph);

    if (d <= 0 || w < 3 || h < 3) return;

    let n = noise(
      px * 0.00001,
      py * 0.01,
      t + d + this.seed
    );

    if (n > 0.55) {
      let split = int(random(2, w - 1));
      this.drawRecursive(x, y, split, h, d - 1);
      this.drawRecursive(x + split, y, w - split, h, d - 1);
    } else if (n < 0.35) {
      let split = int(random(2, h - 1));
      this.drawRecursive(x, y, w, split, d - 1);
      this.drawRecursive(x, y + split, w, h - split, d - 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
