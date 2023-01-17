var cols, rows;
var scl = 20;
var w = 1200;
var h = 400;
var zoff = 0;
var inc = 0.1;
var zinc = 0.02;
var start = 0;
var minVal = -50;
var maxVal = 50;
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
  
  translate(-w/2, -h/2);
  
  let yoff = -start;
  for (let y = 0; y < rows - 1; y++) {
    let xoff = 0;
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      vertex(x*scl, (y+1)*scl, map(noise(yoff,zoff,xoff), 0, 1, minVal, maxVal));
      vertex(x*scl, (y-1)*scl, map(noise(zoff,xoff,yoff), 0, 0, maxVal, minVal));
      xoff += inc;
    }
    yoff += inc;
    endShape();
  }

  zoff += zinc;
  start += startInc;
}