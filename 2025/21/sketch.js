class Snake {
  constructor() {
    this.path = [createVector(random(width), random(height))]; // Start at a random position
    this.stepSize = 15;
    this.maxLength = 20;
    this.angle = random(TWO_PI); // Random initial angle
  }

  update(snakes) {
    let newX = this.path[this.path.length - 1].x + cos(this.angle) * this.stepSize;
    let newY = this.path[this.path.length - 1].y + sin(this.angle) * this.stepSize;
    let newPos = createVector(newX, newY);
    
    // Check for boundary collisions
    if (newX < 0 || newX > width || newY < 0 || newY > height) {
      this.angle += PI; // Reverse direction
    } else if (this.checkCollision(newPos, snakes)) {
      this.angle += random(PI / 2, PI); // Change direction drastically
    } else {
      this.path.push(newPos);
      if (this.path.length > this.maxLength) {
        this.path.shift();
      }
    }
    
    this.angle += random(-PI / 6, PI / 6); // Slight random movement
  }

  checkCollision(pos, snakes) {
    for (let snake of snakes) {
      if (snake === this) continue; // Skip self
      for (let point of snake.path) {
        if (dist(pos.x, pos.y, point.x, point.y) < 20) {
          return true; // Collision detected
        }
      }
    }
    return false;
  }

  draw(colour) {
    stroke(colour);
    strokeWeight(10);
    noFill();
    beginShape();
    for (let i = 0; i < this.path.length; i++) {
      curveVertex(this.path[i].x, this.path[i].y);
    }
    endShape();
  }
}

let snakes = [];
let colours = [];
let backgroundColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(random(100,255), random(100,255), random(100,255));
  for (let i = 0; i < 100; i++) {
    snakes.push(new Snake());
    colours.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(backgroundColor);
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].update(snakes);
    snakes[i].draw(colours[i]);
  }
}
