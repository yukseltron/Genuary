
let s = 20;
let reverse = false;
let w;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke('white');
  noFill();
  drawGrid(1);
  //drawGrid(10);
  //drawGrid(600, 600,10);
  frameRate(50);
  if (s >= windowHeight/2){
    //reset();
    reverse = true;
  } else if (s <= 0) {
    reverse = false;
  }
}

function drawGrid(i) {
  w = windowWidth/2;
  h = windowHeight/2;
  s = !reverse ? s += i : s -= i;

  rectMode(CENTER);
  angleMode(DEGREES);

  translate(w,h);

  rotate(frameCount);
  strokeWeight(4);
  stroke(random(25), random(200), 0)
  rect(0, 0, s*4, s*4);
  stroke('black')
  strokeWeight(8);
  ellipse(0, 0, s*4.5);
  
  rotate(frameCount/2);
  stroke(random(25), random(200), 0)
  strokeWeight(4);
  rect(0, 0, s*2, s*2);
  stroke('black')
  strokeWeight(8);
  ellipse(0, 0, s*2.5);

  rotate(frameCount/4);
  stroke(random(25), random(200), 0)
  strokeWeight(4);
  rect(0, 0, s, s);
  stroke('black')
  strokeWeight(8);
  ellipse(0, 0, s/1.5);

  rotate(frameCount/8);
  stroke(random(25), random(200), 0)
  strokeWeight(4);
  rect(0, 0, s/2, s/2);
  stroke('black')
  strokeWeight(8);
  ellipse(0, 0, s/2.5);

  rotate(frameCount/16);
  stroke(random(25), random(200), 0)
  strokeWeight(4);
  rect(0, 0, s/4, s/4);
  stroke('black')
  strokeWeight(8);
  ellipse(0, 0, s/4.5);

  rotate(frameCount/32);
  stroke(random(25), random(200), 0)
  strokeWeight(4);
  rect(0, 0, s/8, s/8);
  stroke('black')
  strokeWeight(8);
  ellipse(0, 0, s/8.5);

  rotate(frameCount/64);
  stroke(random(25), random(200), 0)
  strokeWeight(4);
  rect(0, 0, s/16, s/16);
  stroke('black')
  strokeWeight(10);
  ellipse(0, 0, s/16.5);
}
