let t = 0;

function setup() {
  createCanvas(600, 600);
  stroke('orangered');
  strokeWeight(2);
  noFill();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  beginShape();
  let points = 200;
  let baseRadius = 300;

  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);

    let n = noise(
      cos(angle) + 1.5,
      sin(angle) + 1.5,
      t
    );

    let distortion = map(n, 0, 1, -800, 80);
    let r = baseRadius + distortion;

    let x = cos(angle) * r;
    let y = sin(angle) * r;

    vertex(x, y);
  }
  endShape(CLOSE);

  t += 0.008;
}
