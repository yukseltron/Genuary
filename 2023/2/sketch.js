
var myLoopingNoiseArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

//-------------------------------------------
function draw() {

  background(0);
  makeLines(100, '#00FFFF');

}

function makeLines(steps, color) {
  var myScale = 0.05;
  var radius = 100.0;

  var currStep = frameCount % steps;
  var t = map(currStep, 0, steps, 0, TWO_PI);
  var px = width + radius * cos(t);

  var noiseAtLoc = height * noise(myScale * px);
  myLoopingNoiseArray[currStep] = noiseAtLoc;
  noFill();
  stroke(color);
  makeLine(steps);

  noStroke();
  fill(255);
  var ex = map(currStep, 0, steps - 1, 0, width);
  ellipse(ex, noiseAtLoc, 7, 7);

}
function makeLine(steps) {
  beginShape();
  for (var i = 0; i < steps; i++) {
    var nx = map(i, 0, steps - 1, 0, width);
    var ny = myLoopingNoiseArray[i];
    ellipse(nx, ny, 5, 5);
    curve(-ny, -nx, nx-10, -ny-10, nx+10, ny+10, width, -height);
  }
  endShape();
}










