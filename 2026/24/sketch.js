const COLS = 12;
const ROWS = 10;
let noiseOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(15);
  
  let padding = 80;
  let gridW = width - padding * 2;
  let gridH = height - padding * 2;
  let cellW = gridW / (COLS - 1);
  let cellH = gridH / (ROWS - 1);

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let normX = i / (COLS - 1);
      let normY = j / (ROWS - 1);
      let x = padding + i * cellW;
      let y = padding + j * cellH;
      let driftMagnitude = map(normY, 0, 1, 0, 40);
      x += map(noise(noiseOffset, i, j), 0, 1, -driftMagnitude, driftMagnitude);
      y += map(noise(noiseOffset + 10, i, j), 0, 1, -driftMagnitude, driftMagnitude);

      
      let colorLerp = map(normX, 0, 1, 0, 1);
      let col = lerpColor(color(255, 40, 0), color(0, 255, 230), colorLerp);
      fill(col);

      drawMorphingBlob(x, y, normX, normY);
    }
  }
  
  noiseOffset += 0.01;
}

function drawMorphingBlob(x, y, nx, ny) {
  push();
  translate(x, y);
  beginShape();
  
  let noiseFrequency = map(nx, 1, 0, 0.1, 1.5);
  let baseRadius = 25;

  for (let a = 0; a < TWO_PI; a += 0.2) {
    let xoff = map(cos(a), -1, 1, 0, noiseFrequency);
    let yoff = map(sin(a), -1, 1, 0, noiseFrequency);
    let wobble = map(nx, 1, 0, 5, 40);
    let r = baseRadius + map(noise(xoff + noiseOffset, yoff), 0, 1, -wobble, wobble);
    let vx = r * cos(a);
    let vy = r * sin(a);
    curveVertex(vx, vy);
  }
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}