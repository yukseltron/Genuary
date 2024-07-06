let shapes = [];
let shapeCount = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  for (let i = 0; i < shapeCount; i++) {
    shapes.push(new UndecidedShape(random(width), random(height)));
  }
}

function draw() {
  //background(255, 50);
  for (let shape of shapes) {
    shape.update();
    shape.display();
  }
}

class UndecidedShape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(100, 200);
    this.type = random(['circle', 'triangle', 'square']);
    this.speed = random(0.5, 2);
    this.angle = random(TWO_PI);
  }

  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x > width || this.x < 0) {
      this.angle = PI - this.angle;
    }
    if (this.y > height || this.y < 0) {
      this.angle = -this.angle;
    }
  }

  display() {
    fill(255, 150, 50, 10);
    stroke(200,200,200, 100);
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    switch (this.type) {
      case 'circle':
        ellipse(0, 0, this.size);
        break;
      case 'triangle':
        triangle(-this.size / 2, this.size / 2, 0, -this.size / 2, this.size / 2, this.size / 2);
        break;
      case 'square':
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        break;
    }

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
