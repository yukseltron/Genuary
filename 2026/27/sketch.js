let cells = [];
let snakes = [];
let initialCellCount = 10;
let initialSnakeCount = 10; 
let snakeColours = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES); 
  
  for (let i = 0; i < initialCellCount; i++) {
    cells.push(new Cell(random(width), random(height)));
  }
  
  for (let i = 0; i < initialSnakeCount; i++) {
    snakes.push(new Snake());
    snakeColours.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(0); 

  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].display();
    cells[i].checkEdges();
    
    for (let j = i + 1; j < cells.length; j++) {
      cells[i].interact(cells[j]);
    }
  }

  for (let i = 0; i < snakes.length; i++) {
    snakes[i].update(snakes);
    snakes[i].display(snakeColours[i]);
  }
}

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2)); 
    this.hue = random(360);
    this.sizeMult = random(0.1, 0.7);
    this.pulseSpeed = random(0.2, 0.8);
    this.dashStyle = [random(20, 100), random(40, 70)];
    this.useDash = random() > 0.5;
    this.organelle1Offset = createVector(random(-15, 15), random(-15, 15));
    this.organelle2Offset = createVector(random(-15, 15), random(-15, 15));
    this.mainBlobWeight = random(1, 8);
    this.innerDetailWeight = random(5, 15);
    this.nucleusWeight = random(5, 15);
    this.organelle1Weight = random(5, 15);
    this.organelle2Weight = random(5, 15);
    this.phase = random(1000);
    this.zoff = random(1000);
    this.breathing = random(1000);
  }

  update() {
    this.pos.add(this.vel);
    this.phase += 0.3;
    this.zoff += 0.01;
    this.breathing += this.pulseSpeed;
  }

  interact(other) {
    let distThreshold = 100 * this.sizeMult;
    let d = p5.Vector.dist(this.pos, other.pos);
    if (d < distThreshold) {
      let force = p5.Vector.sub(this.pos, other.pos);
      force.setMag(0.1);
      this.vel.add(force);
      this.vel.limit(2);
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    colorMode(HSB);
    
    stroke(this.hue, 100, 100);
    strokeWeight(this.mainBlobWeight);
    this.renderWobble(1.5, this.sizeMult, this.useDash, color(this.hue, 80, 80, 0.6));
    
    stroke((this.hue + 180) % 360, 60, 100);
    strokeWeight(this.innerDetailWeight);
    this.renderWobble(1.2, this.sizeMult * 0.7, !this.useDash, null);

    stroke(this.hue, 100, 100);
    strokeWeight(this.nucleusWeight);
    this.renderWobble(0.8, this.sizeMult * 0.4, this.useDash, color(this.hue, 80, 80, 0.8));

    push();
    translate(this.organelle1Offset.x, this.organelle1Offset.y);
    stroke((this.hue + 90) % 360, 80, 100);
    strokeWeight(this.organelle1Weight);
    this.renderWobble(0.5, this.sizeMult * 0.1, !this.useDash, null);
    pop();
    
    push();
    translate(this.organelle2Offset.x, this.organelle2Offset.y);
    stroke((this.hue + 270) % 360, 80, 100);
    strokeWeight(this.organelle2Weight);
    this.renderWobble(0.3, this.sizeMult * 0.05, this.useDash, null);
    pop();
    pop();
  }

  renderWobble(nm, v, dashed, fillC) {
    push();
    if (fillC) fill(fillC);
    else noFill();

    if (dashed) drawingContext.setLineDash(this.dashStyle);
    else drawingContext.setLineDash([]);

    beginShape();
    for (let a = 0; a < 360; a += 15) {
      let xoff = map(cos(a + this.phase), -1, 1, 0, nm);
      let yoff = map(sin(a + this.phase), -1, 1, 0, nm);
      let r = map(noise(xoff, yoff, this.zoff), 0, 1, 40, 90);
      let bModX = (sin(0.185 * this.breathing) + 2);
      let bModY = (sin(0.185 * this.breathing) + 3);
      let x = r * cos(a) * v * bModX;
      let y = r * sin(a) * v * bModY;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  checkEdges() {
    if (this.pos.x < 50 || this.pos.x > width - 50) this.vel.x *= -1;
    if (this.pos.y < 50 || this.pos.y > height - 50) this.vel.y *= -1;
  }
}

class Snake {
  constructor() {
    this.path = [createVector(random(width), random(height))]; 
    this.stepSize = 5;
    this.maxLength = random(1,20);
    this.angle = random(360); 
  }

  update(snakes) {
    
    let newX = this.path[this.path.length - 1].x + cos(this.angle) * this.stepSize;
    let newY = this.path[this.path.length - 1].y + sin(this.angle) * this.stepSize;
    let newPos = createVector(newX, newY);
    
    if (newX < 0 || newX > width || newY < 0 || newY > height) {
      this.angle += 180; 
    } else if (this.checkCollision(newPos, snakes)) {
      this.angle += random(90, 180); 
    } else {
      this.path.push(newPos);
      if (this.path.length > this.maxLength) {
        this.path.shift();
      }
    }
    this.angle += random(-30, 30); 
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

  display(colour) {
    push();
    colorMode(RGB); 
    stroke(colour);
    strokeWeight(10);
    noFill();
    drawingContext.setLineDash([]);
    beginShape();
    for (let i = 0; i < this.path.length; i++) {
      curveVertex(this.path[i].x, this.path[i].y);
    }
    endShape();
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}