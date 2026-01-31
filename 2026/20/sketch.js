let seed;
let t = 0;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  seed = int(random(100000));
  randomSeed(seed);
  noiseSeed(seed);
  noFill();
  frameRate(10);
}

function draw() {
  background(0);
  t += 0.005;

  translate(width / 2, height / 2);

  colorMode(HSL, 360, 100, 100, 100);
  let hue = (seed * 0.3 + frameCount * 0.2) % 360;
  stroke(hue, 70, 35, 85);
  strokeWeight(2);

  drawWanderingFace();
}

function drawWanderingFace() {
  beginShape();

  let x = random(-40, 40);
  let y = random(-60, 60)
  let steps = 900;

  for (let i = 0; i < steps; i++) {
    let p = i / steps;
    let gx = x * -0.002;
    let gy = y * -0.002;
    let angle =
      noise(x * 0.004, y * 0.004, t + p * 2) * TWO_PI * 2;
    let speed = map(noise(p * 5, t), 0, 1, 0.5, 2.5);

    x += cos(angle) * speed + gx;
    y += sin(angle) * speed + gy;

    let r =
      sqrt(x * x + y * y) /
      (220 + noise(p * 2, t) * 120);

    if (r > 1) {
      x *= 0.96;
      y *= 0.96;
    }

    if (random() < 0.004) {
      loopGesture(x, y, random(10, 30));
    }

    vertex(x, y);
  }

  endShape();
}

function loopGesture(cx, cy, size) {
  let loops = int(random(6, 14));
  for (let i = 0; i < loops; i++) {
    let a = map(i, 0, loops, 0, TWO_PI);
    let r =
      size * map(noise(i, t), 0, 1, 0.5, 1.2);

    vertex(
      cx + cos(a) * r,
      cy + sin(a * random(0.6, 1.4)) * r
    );
  }
}

function mousePressed() {
  seed = int(random(100000));
  randomSeed(seed);
  noiseSeed(seed);
}
