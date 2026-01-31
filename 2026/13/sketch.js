let seed;

function setup() {
  createCanvas(600, 600);
  seed = random(1000);
  noFill();
  let size = random(20, 50);
  strokeWeight(3);
}

function draw() {
  randomSeed(seed);
  background(0);
  translate(width / 2, height / 2);

  stroke(random(50, 255), random(50, 255), random(50, 255));
  strokeWeight(random(1, 6));
  let radius = random(120, 180);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let xoff = map(cos(a), -1, 1, 0, 2);
    let yoff = map(sin(a), -1, 1, 0, 2);
    let offset = map(noise(xoff, yoff, frameCount * 0.01), 0, 1, -15, 15);
    let r = radius + offset;
    let x = r * cos(a);
    let y = r * sin(a);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  stroke(random(50, 255), random(50, 255), random(50, 255));
  strokeWeight(random(1, 6));
  let eyeX = random(40, 70);
  let eyeY = -random(30, 60);
  drawScribbleCircle(-eyeX, eyeY, random(20, 50));
  drawScribbleCircle(eyeX, eyeY, random(20, 50));

  stroke(random(50, 255), random(50, 255), random(50, 255));
  strokeWeight(random(1, 6));
  drawMovingMouth(random(40, 80));
  
  stroke(random(50, 255), random(50, 255), random(50, 255));
  strokeWeight(random(1, 6));
  beginShape();
  vertex(0, -10);
  vertex(random(-10, 10), 10);
  vertex(random(-20, 20), 20);
  endShape();
}

function drawScribbleCircle(x, y, size) {
  push();
  translate(x, y);
  beginShape();
  for (let i = 0; i < size; i++) {
    curveVertex(random(-size/2, size/2), random(-size/2, size/2));
  }
  endShape();
  pop();
}

function drawMovingMouth(yPos) {
  beginShape();
  let mouthWidth = random(60, 220);
  let half = mouthWidth / 2;
  let smileDepth = random(20, 60);
  for (let x = -half; x <= half; x += 10) {
    let nx = x / half; // -1 .. 1
    let base = smileDepth * (1 - nx * nx);
    let wobble = (noise(x * 0.05, frameCount * 0.1) - 0.5) * 20;
    let y = yPos + base + wobble;
    curveVertex(x, y);
  }
  endShape();
}

function mousePressed() {
  seed = random(1000);
}