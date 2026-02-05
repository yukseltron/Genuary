let cells = [];
let initialCount = 10;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  // Re-initializing the array to ensure it's fresh
  cells = []; 
  
  for (let i = 0; i < initialCount; i++) {
    cells.push(new Cell(random(width), random(height)));
  }
}

function draw() {
  background(0); // Darker background to make colors pop

  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].display();
    cells[i].checkEdges();
    
    // Minimal Collision: Subtle push away from neighbors
    for (let j = i + 1; j < cells.length; j++) {
      cells[i].interact(cells[j]);
    }
  }
}

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // Movement: Ensuring velocity is actually applied
    this.vel = p5.Vector.random2D().mult(random(0.5, 2)); 
    
    // Genetic Visuals
    this.hue = random(360);
    this.sizeMult = random(0.1, 0.7);
    this.pulseSpeed = random(0.2, 0.8);
    
    // Random dash patterns
    this.dashStyle = [random(20, 100), random(40, 70)];
    this.useDash = random() > 0.5;

    // Random organelle positions
    this.organelle1Offset = createVector(random(-15, 15), random(-15, 15));
    this.organelle2Offset = createVector(random(-15, 15), random(-15, 15));

    // Random stroke weights for each layer
    this.mainBlobWeight = random(1, 8);
    this.innerDetailWeight = random(5, 15);
    this.nucleusWeight = random(5, 15);
    this.organelle1Weight = random(5, 15);
    this.organelle2Weight = random(5, 15);

    // Animation states
    this.phase = random(1000);
    this.zoff = random(1000);
    this.breathing = random(1000);
  }

  update() {
    // Apply movement
    this.pos.add(this.vel);
    
    // Increment animation
    this.phase += 0.3;
    this.zoff += 0.01;
    this.breathing += this.pulseSpeed;
  }

  // Soft collision detection (Separation)
  interact(other) {
    let distThreshold = 100 * this.sizeMult;
    let d = p5.Vector.dist(this.pos, other.pos);
    if (d < distThreshold) {
      let force = p5.Vector.sub(this.pos, other.pos);
      force.setMag(0.1); // Gentle push
      this.vel.add(force);
      this.vel.limit(2); // Keep speed under control
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    colorMode(HSB);
    
    // Style DNA
    stroke(this.hue, 100, 100);
    strokeWeight(this.mainBlobWeight);
    
    // Main Blob
    this.renderWobble(1.5, this.sizeMult, this.useDash, color(this.hue, 80, 80, 0.6));
    
    // Inner Detail (Opposite Hue)
    stroke((this.hue + 180) % 360, 60, 100);
    strokeWeight(this.innerDetailWeight);
    this.renderWobble(1.2, this.sizeMult * 0.7, !this.useDash, null);

    //nucleus
    stroke(this.hue, 100, 100);
    strokeWeight(this.nucleusWeight);
    this.renderWobble(0.8, this.sizeMult * 0.4, this.useDash, color(this.hue, 80, 80, 0.8));

    //organelles
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
    for (let a = 0; a < 360; a += 15) { // Faster rendering
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}