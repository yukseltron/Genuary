class Snake {
  constructor(stepSize, maxLength) {
    this.path = [createVector(random(width), random(height))]; 
    this.stepSize = stepSize;
    this.maxLength = maxLength;
    this.angle = random(TWO_PI); 
  }

  update(snakes) {
    let newX = this.path[this.path.length - 1].x + cos(this.angle) * this.stepSize;
    let newY = this.path[this.path.length - 1].y + sin(this.angle) * this.stepSize;
    let newPos = createVector(newX, newY);
    
    if (newX < 0 || newX > width || newY < 0 || newY > height) {
      this.angle += PI; 
    } else if (this.checkCollision(newPos, snakes)) {
      this.angle += random(PI / 2, PI); 
    } else {
      this.path.push(newPos);
      if (this.path.length > this.maxLength) {
        this.path.shift();
      }
    }
    
    this.angle += random(-PI / 6, PI / 6); 
  }

  checkCollision(pos, snakes) {
    for (let snake of snakes) {
      if (snake === this) continue; 
      for (let point of snake.path) {
        if (dist(pos.x, pos.y, point.x, point.y) < 20) {
          return true; 
        }
      }
    }
    return false;
  }

  draw(colour) {
    stroke(colour);
    noFill();
    beginShape();
    for (let i = 0; i < this.path.length; i++) {
      rect(this.path[i].x, this.path[i].y, 10, 10);
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
  for (let i = 0; i < 10; i++) {
    let stepSize = random(1, 10);
    let maxLength = floor(random(50, 100));
    snakes.push(new Snake(stepSize, maxLength));
    colours.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(backgroundColor);
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].draw(colours[i]);
  }
}

// Moves snakes when scrolling
function mouseWheel(event) {
  let steps = int(abs(event.delta) / 5); // Number of updates per scroll amount
  for (let i = 0; i < steps; i++) {
    for (let snake of snakes) {
      strokeWeight(steps);
      snake.update(snakes);
    }
  }
}
