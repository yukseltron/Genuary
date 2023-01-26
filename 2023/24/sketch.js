let x;
let offset;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  x = 0;
  offset = 10;

  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(4);

  noFill();
}

function draw() {
  stroke(random(255), random(255), random(255));
  lines(1000);
  lines2(1000);
  lines3(1000);
}

function lines(x) {
  //translate(windowWidth/2, windowHeight/2);
  for (let i = 0; i < x; i += 20) {
    line(i,i, windowWidth+i, windowHeight+i);
  }
  let signal = true;

  if (signal === true) {
    translate(random(100), random(100));
    signal = false;
  } else {
    translate(random(-100), random(-100));
    signal = true;
  }
}


function lines2(x) {
  //translate(windowWidth/2, windowHeight/2);
  for (let i = 0; i < x; i += 20) {
    line(i,0, windowWidth-i, windowHeight-i);
  }
}

function lines3(x) {
  //translate(windowWidth/2, windowHeight/2);
  for (let i = 0; i < x; i += 20) {
    line(i,i, -windowWidth-i, -windowHeight-i);
  }
}