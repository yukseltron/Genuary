let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    planets.push({
      neg: random([1, -1]),
      r: random(5, 100),
      color: 'white',
      revolution: random(50, 300),
      steps: int(random(100, 600))
    });
  }
}

function draw() {
  background(0);
  for (let p of planets) {
    planet(p.neg, p.r, p.color, p.revolution, p.steps);
  }
}

function planet(neg, r, color, revolution, steps) {
  var currStep = frameCount % steps;
  var t = map(currStep, 0, steps, 0, TWO_PI);
  var px = width / 2.0 + revolution * cos(t) * neg;
  var py = height / 2.0 + revolution * sin(t);

  noFill();
  stroke(color);
  ellipse(px, py, r, r);
}

function keyPressed() {
  if (key === 's') {
    saveGif('day1', 5);
  }
}
