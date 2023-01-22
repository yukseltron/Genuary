let x;
let offset;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  x = 0;
  offset = 10;

  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(40);

  stroke('white');
  noFill();
}

function draw() {
  translate(windowWidth/2, windowHeight/2);
  circles(x, 'white');

  if (x >= 100)
    offset = -10;
  else if (x <= -100)
    offset = 10;
  x += offset

  circles(x, 'black');
}

function circles(x, c) {
  stroke(c);
  for (let i = 0; i < 500; i+= 10) {
    rect(x,0,i,i);
  }
}