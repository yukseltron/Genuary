let flock;

function setup() {
  createCanvas(windowWidth, windowHeight);
  flock = new Flock(200); // Number of particles in the flock
}

function draw() {
  background('skyblue');

  // Update and display the flock
  flock.run();

}

class Boid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.1;
    this.maxSpeed = 4;
  }

  edges() {
    if (this.position.x > width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = width;

    if (this.position.y > height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = height;
  }

  align(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    this.acceleration.add(alignment);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    fill('blue');
    noStroke();
    ellipse(this.position.x, this.position.y, 50, 50);
  }
}

class Flock {
  constructor(numBoids) {
    this.boids = [];
    for (let i = 0; i < numBoids; i++) {
      this.boids.push(new Boid(random(width), random(height)));
    }
  }

  run() {
    for (let boid of this.boids) {
      boid.edges();
      boid.flock(this.boids);
      boid.update();
      boid.show();
    }
  }
}
