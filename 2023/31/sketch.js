let phase = 0;
let zoff = 0;
let breathing = 10;
let breathingInc = 0.5;
let core;
let c1;
let c2;
let c3;
let c4;
let c5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(25)
  translate(windowWidth/2, windowHeight/2)
  stroke('white');
  strokeWeight(1);
  core = 1;
  sun();
}

function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2)
  //translate(random(-200,200), random(-200,200));
  sun();
}

function sun() {
  wobble(0.25, 1);
  wobble(0.25, 0.8);
  wobble(0.25, 0.6);
  wobble(0.25, 0.4);
  wobble(0.25, 0.2); 
  fill('black');
  //ellipse(0,0, 50-core);
}

function wobble(nm, v)
{
  push();
  noFill();
  beginShape();
  let noiseMax = nm;
  for (let a = 0; a < 360; a += 5) {
    let xoff = map(cos(a + phase)/random(900), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase)/random(900), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 50, 88);
    let x = (r * cos(a) * v * (sin(0.185 * breathing) + 3));
    let y = (r * sin(a) * v * (sin(0.185 * breathing) + 3));
    vertex(x, y);
    vertex(y, -x);
  }

  endShape(CLOSE);
  pop();
  phase += 0.3;
  zoff += 0.01;
  breathing += 0.5;
}