let gridSize = 20;
let cols, rows;
let angleOffset = 100;
let varX, varY;

function setup() {
  createCanvas(500, 500, WEBGL);
  cols = width / gridSize;
  rows = height / gridSize;
  noFill();
  varX = random(5);
  varY = random(5);
}

function draw() {
  background('black');
  rotate(-PI / 4);

  for (let x = -cols / 2; x < cols / 2; x++) {
    for (let y = -rows / 2; y < rows / 2; y++) {
      push();

      let xpos = x * gridSize;
      let ypos = y * gridSize;

      let z = -sin(sqrt(x * x + y * y) * 0.5 + millis() * 0.00008) * gridSize * 3;

      translate(xpos, ypos, z);

      let offset = map(sin(angleOffset + (x + y) * 0.02), -1, 1, -TAU / PI, TAU * PI);
      rotateX(offset);
      rotateY(offset * 0.05);

      stroke('white');
      beginShape();
      ellipse(0, 0, gridSize, gridSize);
      endShape(CLOSE);

      pop();
    }
  }

  angleOffset -= 0.005; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}