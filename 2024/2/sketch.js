let cols; // Number of columns
let rows; // Number of rows
let tileSize;
let r, g, b; // Red, green, and blue color components

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width/10;
  rows = height/10;
  tileSize = 50;
  frameRate(30); // Set the frame rate to control the speed of the animation
  noStroke(); // Remove the stroke from the shapes
  r = random(10, 255); // Random red component
  g = random(10, 255); // Random green component
  b = random(10, 255); // Random blue component
}

function draw() {
  background(220);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Calculate procedural colors for each tile
      let red = sin(frameCount * 0.03 + i * 0.5) * 127 + r; // Red component
      let green = cos(frameCount * 0.06 + j * 0.5) * 127 + g; // Green component
      let blue = tan(frameCount * 0.09 + (i * j) * 0.5) * b; // Blue component
      
      // Draw a rectangle with the procedurally generated color
      fill(red, green, blue);
      rect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
}
