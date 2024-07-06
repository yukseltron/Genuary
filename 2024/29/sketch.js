let time = 0;
let cx, cy, radius;
let directionX = 1;
let directionY = 1;
let radiusDirection = 1;
let resolution = 4; // Adjust this value to control the resolution
let xFactor = 0.01;
let yFactor = 0.01;

function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2);
  noStroke();
  cx = width / 2;
  cy = height / 2;
  radius = min(width, height) / 3;
  frameRate(30); // Limiting the frame rate to reduce CPU usage
  //xFactor = random(0.01, 1);
  //yFactor = random(0.01, 1);
}

function draw() {
  cx += directionX;
  cy += directionY;
  radius += radiusDirection;

  if (cx > width || cx < 0) directionX *= -1;
  if (cy > height || cy < 0) directionY *= -1;
  if (radius > min(width, height) / 2 || radius < min(width, height) / 10) radiusDirection *= -1;

  loadPixels();

  for (let y = 0; y < height; y += resolution) {
    for (let x = 0; x < width; x += resolution) {
      let dist = sdfCircle(x, y, cx, cy, radius);
      let colorValue = map(dist, -radius, radius, 0, 1);
      colorValue = (colorValue + noise(x * xFactor, y * yFactor, time)) % 1;
      let col = color(255 * colorValue, 128 + 127 * sin(PI * colorValue), 255 * (1 - colorValue));

      for (let dy = 0; dy < resolution; dy++) {
        for (let dx = 0; dx < resolution; dx++) {
          if (x + dx < width && y + dy < height) {
            set(x + dx, y + dy, col);
          }
        }
      }
    }
  }

  updatePixels();
  time += 0.001;
}

function sdfCircle(x, y, cx, cy, radius) {
  let dx = x - cx;
  let dy = y - cy;
  return sqrt(dx * dx + dy * dy) / 2;
}

function windowResized() {
  resizeCanvas(windowWidth / 2, windowHeight / 2);
}
