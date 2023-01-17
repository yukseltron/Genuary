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
  noFill();
  smooth();
  
  translate(-w/2, -h/2);
  
  let yoff = -start;
  for (let y = 0; y < rows - 1; y++) {
    if (y === rows/2-1) {
      stroke('#E23E64')
    } else {
      stroke('#6F4683');
    }
    strokeWeight(3)
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