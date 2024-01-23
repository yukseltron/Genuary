let tiles = [];
let tileSize = 100;
let rectOrEllipse = [];
let rows, cols;
let animationSpeed = 0.01;
let sizeDenom;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rows = floor(height / tileSize);
  cols = floor(width / tileSize);
  sizeDenom = random(2, 10);

  // Initialize the tiles with random colors
  for (let i = 0; i < rows; i++) {
    tiles[i] = [];
    for (let j = 0; j < cols; j++) {
      tiles[i][j] = color(random(['#000000', '#be1e2d', '#ffde17', 'beige', '#21409a']))
      rectOrEllipse.push(random([true, false]));
    }
  }
}

function draw() {
  background('beige');

  // Draw the animated mosaic
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * tileSize;
      let y = i * tileSize;

      // Calculate size based on noise
      let size = tileSize + noise(i * 0.1, j * 3, frameCount * animationSpeed) * 200;

      // Draw a star-like shape
      drawShape(x + tileSize / 2, y + tileSize / 2, 5, size / 2, size / sizeDenom, tiles[i][j]);

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

function drawShape(x, y, points, outerRadius, innerRadius, color) {
  beginShape();
  let angle = TWO_PI / points;
  for (let i = 0; i < points; i++) {
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    let xPos = x + cos(angle * i) * radius;
    let yPos = y + sin(angle * i) * radius;
    stroke(color);
    strokeWeight(2);
    line(x, y, xPos+10, yPos+10);
    
    if (rectOrEllipse[i]) {
      rect(xPos, yPos, 50, 50);
    } else {
      ellipse(xPos, yPos, 50, 50);
    }
    vertex(xPos, yPos);
  }
  rotate(PI / 2);
  endShape(CLOSE);
  fill(color);
}
