let colours = [];

function setup() {
  for (let i = 0; i < 300; i++) {
    colours.push(color(random(100,255), random(100,255), random(100,255)));
  }
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(10);
}

function draw() {
  background('#17BEBB');

  for (let x = -windowWidth + 500; x < windowWidth - 500; x+=10) {
    for (let y = -windowHeight + 500; y < windowHeight - 500; y+=10) {
      strokeWeight(10);
      stroke(random(200), random(100,255), random(100,255))
      rect(x, y, 10, 10);
    }
  }
}