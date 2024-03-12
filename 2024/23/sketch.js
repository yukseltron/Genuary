let cols; // Number of columns
let rows; // Number of rows
let tileSize;
let r, g, b; // Red, green, and blue color components

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = 32;
  rows = 32;
  tileX = width / cols;
  tileY = height / rows;
  noFill();
  frameRate(30); // Set the frame rate to control the speed of the animation
  r = random(100, 255); // Random red component
  g = random(10, 255); // Random green component
  b = random(100, 255); // Random blue component
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Calculate procedural colors for each tile
      let red = sin(frameCount * 0.03 + i * 0.5) * 12 + r; // Red component
      let green = cos(frameCount * 0.06 + j * 0.5) * 17 + g; // Green component
      let blue = tan(frameCount * 0.07 + (i * j) * 0.5) * b; // Blue component
      
      // Draw a rectangle with the procedurally generated color
      stroke(red, green, blue);
      rect(i * tileX, j * tileY, tileX, tileY);
    }
  }
}
