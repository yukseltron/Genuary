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

let eggWhiteSize;
let eggX;
let yolk;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(25)
  translate(windowWidth/2, windowHeight/2)
  stroke('white');
  strokeWeight(10);
  core = 1;
  background(0);

  eggX = random(2,5);
  eggY = random(2,5);
  eggWhiteSize = 0.5;
  yolk = {
    color: 'orange',
    size: random(eggWhiteSize-0.05, eggWhiteSize-0.01)
  }
}

function draw() {
  background(0)
  translate(windowWidth/2, windowHeight/2)
  //translate(random(-200,200), random(-200,200));
  egg();
}

function egg() {
  wobble(eggWhiteSize, 1, 'white', eggX);
  translate(random(-100,100))
  wobble(eggWhiteSize, yolk.size, yolk.color, eggY);
}

function wobble(nm, v, c, size)
{
  push();
  if (c) {
    fill(c);
  }
  
  beginShape();
  let noiseMax = nm;
  for (let a = 0; a < 360; a += 5) {
    let xoff = map(cos(a + phase), -1, 1, -1, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 1, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 50, 88);
    let x = (r * cos(a) * v * (sin(0.185 * breathing) + size));
    let y = (r * sin(a) * v * (sin(0.185 * breathing) + 3));
    vertex(x,y)
  }

  endShape(CLOSE);
  pop();
  phase += 0.3;
  zoff += 0.01;
  breathing += 0.5;
}