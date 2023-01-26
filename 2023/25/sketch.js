let x;
let offset;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)

  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(40);
  translate(windowWidth/2, windowHeight/2);

  stroke('white');
  noFill();
}

function draw() {
  circles(10, windowWidth, windowHeight);
}

function circles(x, w, h) {

  let a = random(w);
  let b = random(h);
  let c = random(100);

  for (let i = 1 ; i < random(x); i++) {
    ellipse(a, b, c/i);
  }
}