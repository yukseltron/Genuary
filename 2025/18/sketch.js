let gridSize = 20;
let cols, rows;
let angleOffset = 100;
let varX, varY;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = width / gridSize;
  rows = height / gridSize;
  noFill();
  varX = random(10);
  varY = random(10);
}

function draw() {
  background('#04A777');
  rotate(-PI / 4);

  for (let x = -cols / 2; x < cols / 2; x++) {
    for (let y = -rows / 2; y < rows / 2; y++) {
      push();

      let xpos = x * gridSize;
      let ypos = y * gridSize;

      let z = gridSize * 3;

      translate(xpos, ypos, z);

      let offset = map(sin(angleOffset + (x + y) * 0.02), -1, 1, -TAU / PI, TAU * PI);
      rotateX(offset);
      rotateY(offset * 0.05);

      let strokeColor = map(offset, -TAU / PI, TAU * PI, 255, 0);
      stroke(strokeColor);

      beginShape();
      line(0, 0, 0, gridSize, 0, 0);
      endShape(CLOSE);

      pop();
    }
  }

  angleOffset -= 0.005; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}