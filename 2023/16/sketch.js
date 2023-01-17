function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  cube(8,-1);
  cube(16,1);
  cube(32,-1);
  cube(64,1);
  cube(128,-1);
  cube(256,1);
}

function cube(size, direction) {
  noFill();
  //small box
  stroke('white');
  rotateX(frameCount * 0.002 * -direction);
  rotateY(frameCount * 0.002 * direction);
  box(size,random(size,size),size);
}