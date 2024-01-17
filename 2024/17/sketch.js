let tiles = [];
let tileSize = 20;
let rows, cols;
let animationSpeed = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rows = floor(height / tileSize);
  cols = floor(width / tileSize);

  // Initialize the tiles with random colors
  for (let i = 0; i < rows; i++) {
    tiles[i] = [];
    for (let j = 0; j < cols; j++) {
      tiles[i][j] = color(random(255), random(100, 255), random(100, 255));
    }
  }
}

function draw() {
  background(255);

  // Draw the animated mosaic
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * tileSize;
      let y = i * tileSize;

      // Calculate size based on noise
      let size = tileSize + noise(i * 0.1, j * 0.1, frameCount * animationSpeed) * 30;

      // Draw a star-like shape
      drawStar(x + tileSize / 2, y + tileSize / 2, 5, size / 2, size / 4, tiles[i][j]);

      // Connect stars to their neighbors
      if (i < rows - 1) {
        let nextY = (i + 1) * tileSize + tileSize / 2;
        line(x + tileSize / 2, y + tileSize / 2, x + tileSize / 2, nextY);
      }

      if (j < cols - 1) {
        let nextX = (j + 1) * tileSize + tileSize / 2;
        line(x + tileSize / 2, y + tileSize / 2, nextX, y + tileSize / 2);
      }
    }
  }
}

function drawStar(x, y, points, outerRadius, innerRadius, color) {
  beginShape();
  let angle = TWO_PI / points;
  for (let i = 0; i < points * 2; i++) {
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    let xPos = x + cos(angle * i) * radius;
    let yPos = y + sin(angle * i) * radius;
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
  fill(color);
}
