let particles = [];
let fib = [];
let t = 0;

const NUM_PARTICLES = 600;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(Math.min(2, window.devicePixelRatio));
  background(245);

  generateFibonacci(12);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    let f = fib[i % fib.length];
    particles.push(new Particle(f, i));
  }
}

function draw() {
  background(0, 10);
  translate(width / 2, height / 2);

  t += 0.002;

  for (let p of particles) {
    p.update();
    p.display();
  }
}

function generateFibonacci(n) {
  fib = [1, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
}

class Particle {
  constructor(f, i) {
    this.f = f;
    this.index = i;

    this.baseRadius = f * 6;
    this.angleOffset = i * 0.618033;
    this.noiseSeed = random(1000);

    this.pos = p5.Vector.random2D().mult(random(10));
    this.col = [
      random(30, 230),
      random(30, 230),
      random(30, 230)
    ];
  }

  update() {
    let n = noise(
      this.noiseSeed,
      t * 2,
      this.index * 0.01
    );

    let angle =
      this.angleOffset +
      t * (0.5 + this.f * 0.002) +
      n * TWO_PI;

    let radius =
      this.baseRadius +
      sin(t * 3 + this.index * 0.1) * this.f * 0.4;

    let target = createVector(
      cos(angle) * radius,
      sin(angle) * radius
    );

    this.pos.lerp(target, 0.02);
  }

  display() {
    noStroke();
    let alpha = map(this.f, 1, fib[fib.length - 1], 40, 10);
    fill(this.col[0], this.col[1], this.col[2]);
    ellipse(this.pos.x, this.pos.y, 2.5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(245);
}
