
let s = 20;
let reverse = false;
let w;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  drawGrid(1);
  noFill();
  frameRate(1);
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

  noFill();s
  stroke('white');
  strokeWeight(4);

  drawWindow(0,-300);
  drawWindow(100,-300);
  drawWindow(-100,-300);

  drawWindow(0,-150);
  drawWindow(100,-150);
  drawWindow(-100,-150);

  drawWindow(0,0);
  drawWindow(100,0);
  drawWindow(-100,0);

  drawWindow(0,150);
  drawWindow(-100,150);
  drawWindow(100,150);

  drawWindow(0,300);
  drawWindow(-100,300);
  drawWindow(100,300);
}

function drawWindow(x,y) {
  strokeWeight(2);
  stroke('white')
  if (random(10) >= 7) {
    noStroke()
    fill(255,255,0,random(10));
    for(i = 0; i < 100; i++){
      //ellipse(x,y, i);
      rect(x+random(-20,20),y+random(-20,20), i, i);
      rect(x-random(-20,20),y-random(-20,20), i, i);
    }
    stroke('white');
  } else if (random(10) <= 5) {
    rect(x,y+random(-50,50),50, 0)
    rect(x,y+random(-50,50),50, 0)
    rect(x+random(-20,20),y,0, 100)
  } else {
    noFill();
  }
  rect(x,y,50, 100)
  rect(x,y+55,50, 0)
  rect(x,y+60,25, 0)
  rect(x,y-50,15,2)
}
