class Snake {
  constructor(index) {
    this.path = [createVector((index * 20) % width, (index * 20) % height)];
    this.stepSize = 10;
    this.maxLength = 40;
    this.angle = (index * 0.1) % TWO_PI;
    this.chaosValue = 0.7 + (index * 0.005); 
  }

  update(snakes) {
    let lastPos = this.path[this.path.length - 1];
    let newX = lastPos.x + this.stepSize * (1.5 - this.chaosValue);
    let newY = lastPos.y + this.stepSize * this.chaosValue;

    
    if (newX < 0) {
     newX = width;
    } else if (newX > width) {
      newX = 0;
    }

    if (newY < 0) {
      newY = height;
    } else if (newY > height) {
      newY = 0;
    }

    let newPos = createVector(newX, newY);

    if (this.checkCollision(newPos, snakes)) {
      this.chaosValue = 3.3 * this.chaosValue * (1 - this.chaosValue); 
    }

    this.path.push(newPos);
    if (this.path.length > this.maxLength) {
      this.path.shift();
    }

    this.angle += (this.chaosValue - 0.5) * PI; 
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
  backgroundColor = color(200, 150, 250); 
  for (let i = 0; i < 100; i++) {
    snakes.push(new Snake(i));
    colours.push(color((i * 5) % 255, (i * 3) % 255, (i * 7) % 255)); 
  }
}

function draw() {
  background(backgroundColor);
  for (let i = 0; i < snakes.length; i++) {
    snakes[i].update(snakes);
    snakes[i].draw(colours[i]);
  }
}
