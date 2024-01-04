let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background('beige');
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-100,100), 0);
    this.maxSpeed = 2;
    this.color = color(0);
    this.noiseScale = random(0.01, 0.1);
    this.noiseStrength = random(0.5, 10);
  }

  update() {
    this.velocity.add(random([-1, 0, 0, 0, 0, 0, 0, 1]), random([-1, 0, 0, 0, 0, 0, 0, 1]));
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.checkEdges();
  }

  checkEdges() {
    if (this.position.x > width || this.position.x < 0 || this.position.y > height || this.position.y < 0) {
      this.position.x = random(width);
      this.position.y = random(height);
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, 2);
  }
}
