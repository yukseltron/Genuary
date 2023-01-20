
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke('white');
  noFill();
  rectMode(CENTER);
  drawGrid(800,800,20);
  frameRate(5);
}

function drawGrid(w, h, i) {
  if (i === 0) {
    rect(random(windowWidth/2-100, windowWidth/2+100), random(windowHeight/2-100, windowHeight/2+100), w, h);
  } else {
    //random([rectMode(CENTER), rectMode(CORNERS)])
    rect(random(windowWidth/2-100, windowWidth/2+100), random(windowHeight/2-100, windowHeight/2+100), w, h);
    drawGrid(w/1.25, h/1.25, i-1);
  }
}
