class Snake {
  constructor() {
    this.path = [createVector(random(width), random(height))]; 
    this.stepSize = 50;
    this.maxLength = 25;
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

  draw(colour, width, height) {
    noFill();
    for (let i = 0; i < this.path.length; i++) {
      rect(this.path[i].x, this.path[i].y, width, height);
      rect(this.path[i].x + 10, this.path[i].y + 10, width - 20, height - 20);
    }
    
  }
}

let snakes = [];
let colours = [];
let widths = [];
let heights = [];
let backgroundColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = 'lightgrey';
  frameRate(20);
  for (let i = 0; i < 10; i++) {
    snakes.push(new Snake());
    colours.push(color(random(255), random(255), random(255)));
    widths.push(random(5, 50));
    heights.push(random(5, 50));
  }
}

function draw() {
  background(backgroundColor);
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].update(snakes);
    snakes[i].draw(colours[i], widths[i], heights[i]);
  }
}
