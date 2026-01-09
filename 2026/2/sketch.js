let trail = [];
let maxPoints = 500;
let t = 10;
let randomFollowThroughDistortion;

function setup() {
  createCanvas(700, 700);
  strokeWeight(20);
  noFill();
  randomFollowThroughDistortion = random(0.002, 0.01);
}

function draw() {
  background(0);

  let radius = 200 + noise(t) * 60;
  let angle = t * 0.8;

  let head = createVector(
    width / 2 + cos(angle) * radius,
    height / 2 + sin(angle * 1.2) * radius * 0.8
  );

  trail.unshift(head);
  if (trail.length > maxPoints) trail.pop();

  stroke("#00ffd5");

  beginShape();
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];

    let lag = i * randomFollowThroughDistortion;
    let offset =
      sin(t * 3 - lag * 4) * map(i, 0, trail.length, 20, 0);

    vertex(
      p.x + cos(t + lag) * offset,
      p.y + sin(t - lag) * offset
    );
  }
  endShape();

  t += 0.015;
}
