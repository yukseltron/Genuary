var cols, rows;
var scl = 20;
var w = 1200;
var h = 400;
var zoff = 0;
var inc = 0.95;
var zinc = 0.01;//speed
var start = 0;
var minVal = -100;
var maxVal = 100;
var startInc = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = h / scl;
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  smooth()
  translate(-w/2, -h/4);
  let yoff = -start;

  for (let y = 0; y < rows/2; y++) {
    let xoff = 0;
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      xoff += inc;
    }
    yoff += inc;
    endShape();
  }

  zoff += zinc;
  start += startInc;
}