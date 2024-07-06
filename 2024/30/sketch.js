let osc;
let notes = [60, 62, 64, 67, 69, 72];
let startMillis;
let circleX, circleY;
let directionX, directionY;
let colorR, colorG, colorB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0);
  startMillis = millis();
  circleX = width / 2;
  circleY = height / 2;
  directionX = random([-1, 1]);
  directionY = random([-1, 1]);
  noStroke();
  colorR = random(100,200);
  colorG = random(100,200);
  colorB = random(200,250);
}

function draw() {
  //background(0);
  let currentMillis = millis() - startMillis;

  if (currentMillis > 500) {
    playNote();
    startMillis = millis();
    moveCircle();
  }

  fill(colorR, colorG, colorB, 10);
  ellipse(circleX, circleY, 10);
  colorR += random(-1, 1);
  colorG += random(-1, 1);
  colorB += random(-1, 1);
}

function playNote() {
  let note = random(notes);
  let freq = midiToFreq(note);
  osc.freq(freq);
  osc.amp(0.5, 0.05);
  osc.amp(0, 0.5);
  directionX = random([-1, 1]);
  directionY = random([-1, 1]);
}

function moveCircle() {
  circleX += directionX * random(10, 50);
  circleY += directionY * random(10, 50);

  // Constrain the circle within the canvas
  if (circleX > width || circleX < 0) {
    directionX *= -1;
  }
  if (circleY > height || circleY < 0) {
    directionY *= -1;
  }
}