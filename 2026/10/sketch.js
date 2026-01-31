let t = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS);
  noFill();
}

function draw() {
  background('black');
  translate(width / 2, height / 2);

  let maxR = min(width, height) * 0.45;
  let layers = 10;

  for (let i = 0; i < layers; i++) {
    let baseR = map(i, 0, layers, 25, maxR);
    stroke('white');
    strokeWeight(2);

    beginShape();
    for (let a = 0; a < TWO_PI + 0.005; a += 0.05) {
      let n = noise(
        cos(a) + 1 + i * 0.1,
        sin(a) + 1 + t
      );

      let offset = map(n, 0, 1, -25, 25);
      let r = baseR + offset;

      let x = r * cos(a ** 2);
      let y = r * sin(a * 2);
      curveVertex(x, y);
    }
    endShape(CLOSE);
  }

  t += 0.005;
}
