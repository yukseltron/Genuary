let colours = [];

function setup() {
  for (let i = 0; i < 30; i++) {
    colours.push(color(random(100,255), random(100,255), random(100,255)));
  }
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
}

function draw() {
  background('#8380B6');
  let direction = 1;

  for (let i = 10; i < 300; i+=10) {
    strokeWeight(3);
    stroke(colours[i/10]);
    cube(i, direction);
    direction *= -1;
  }
}

function cube(size, direction) {
  noFill();
  //small box
  rotateX(frameCount * 0.004 * direction);
  rotateY(frameCount * 0.004 * direction);
  box(size,random(size,size),size);
}