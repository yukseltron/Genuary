let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(255);
  loadPixels();

  let cx = width / 2;
  let cy = height / 2;
  let radius = min(width, height) / 4;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let dist = sdfCircle(x, y, cx, cy, radius);
      let colorValue = map(dist, -radius, radius, 0, random(255));
      colorValue = (colorValue + noise(x * 0.01, y * 0.01, time) * 255) % 255;
      let col = color(colorValue, colorValue, colorValue);
      set(x, y, col);
    }
  }

  updatePixels();
  time += 1;
}

function sdfCircle(x, y, cx, cy, radius) {
  let dx = x - cx;
  let dy = y - cy;
  return sqrt(dx * dx + dy * dy) - radius;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
