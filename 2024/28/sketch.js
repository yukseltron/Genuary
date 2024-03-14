class Snake {
  constructor() {
    this.path = [createVector(width/2, height/2)]; // Array to store the points of the path
    this.stepSize = 5; // Size of each step
    this.maxLength = 50; // Maximum length of the path
    this.angle = 0; // Initial angle
  }

  update() {
    let newX = this.path[this.path.length - 1].x + cos(this.angle) * this.stepSize;
    let newY = this.path[this.path.length - 1].y + sin(this.angle) * this.stepSize;
    
    if (newX < 0 || newX > width || newY < 0 || newY > height) {
      this.angle += PI; // Reverse direction if hitting boundaries
    } else {
      this.path.push(createVector(newX, newY));
      if (this.path.length > this.maxLength) {
        this.path.shift(); // Remove the oldest point if the path is too long
      }
    }

    this.angle += random(-PI / 6, PI / 6); // Increase the angle randomly
  }

  draw(colour) {
    fill(colour[0], colour[1], colour[2], 5);
    push();
    for (let i = 0; i < this.path.length; i++) {
      stroke('white');
      rect(this.path[i].x, this.path[i].y, 200, 200);
    }
    pop();
  }
}

let snakes = [];
let colours = [];
let backgroundColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(random(100,255), random(100,255), random(100,255));
  for (let i = 0; i < 10; i++) { // Create 5 snakes
    snakes.push(new Snake());
    colours.push([random(255), random(255), random(255)]);
  }
}

function draw() {
  background(backgroundColor);
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].update();
    snakes[i].draw(colours[i]);
  }
}
