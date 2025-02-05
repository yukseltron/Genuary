class Snake {
  constructor() {
    this.path = [createVector(random(width), random(height))]; // Array to store the points of the path
    this.stepSize = 400; // Size of each step
    this.maxLength = 5; // Maximum length of the path
    this.angle = 0; // Initial angle
    frameRate(10);
  }

  update() {
    let newX = this.path[this.path.length - 1].x + cos(this.angle) * this.stepSize;
    let newY = this.path[this.path.length - 1].y + sin(this.angle) * this.stepSize;
    
    if (newX < 0 || newX > width || newY < 0 || newY > height) {
      this.angle += 4; // Reverse direction if hitting boundaries
    } else {
      this.path.push(createVector(newX, newY));
      if (this.path.length > this.maxLength) {
        this.path.shift(); // Remove the oldest point if the path is too long
      }
    }

    this.angle += random(-4 / 6, 4 / 6); // Increase the angle randomly
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
  for (let i = 0; i < 8; i++) { // Create 5 snakes
    snakes.push(new Snake());
    colours.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(backgroundColor);
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].update();
    snakes[i].draw(colours[i]);
  }
}
