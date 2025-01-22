let gridSize = 15;
let cols, rows;
let angleOffset = 100;

function setup() {
  createCanvas(500, 500, WEBGL);
  cols = width / gridSize;
  rows = height / gridSize;
  noFill();
}

function draw() {
  background('orangered');

  for (let x = -cols / 2; x < cols / 2; x++) {
    for (let y = -rows / 2; y < rows / 2; y++) {
      push();

      let xpos = x * gridSize;
      let ypos = y * gridSize;

      let z = sin(sqrt(x * x + y * y) * 0.5 + millis() * 0.002) * gridSize * 2;

      translate(xpos, ypos, z);

      let offset = map(sin(angleOffset + (x + y) * 0.2), -1, 1, -PI / 4, PI / 4);
      rotateX(offset);
      rotateY(offset * 0.5);

      stroke('white')
      box(gridSize * 0.6);

      pop();
    }
  }

  angleOffset += 0.05; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}