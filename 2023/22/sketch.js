// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)

  // Define colors
  c1 = color(255, 255, 255);
  c2 = color(0, 0, 0);

  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(5);

}

function draw() {
  c1.setAlpha(random(10));
  c2.setAlpha(random(10))

  translate(windowWidth/2-500, windowHeight/2-500);
  setGradient(0,0,random(1000),random(1000),c2,c1,X_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 0.5);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
